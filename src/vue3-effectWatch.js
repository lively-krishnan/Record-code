// 模拟vue3 effectWatch

let currentEffect;
class Dep{
  constructor(val) {
    this.effects = new Set()
    this._val = val
  }
  // 获取到值得时候 去收集依赖
  get value() {
    this.depend()
    return this._val
  }
  // 更改值得时候 去触发依赖
  set value(newVal) {
    this._val = newVal
    this.notify()
  }
  // 收集依赖
  depend() {
    // 判断全局变量是否有值， 当然开头也是需要一段调用 第 38 行 代码存在的意义
    if (currentEffect){
      this.effects.add(currentEffect)
    }
  }
  // 触发依赖
  notify() {
    this.effects.forEach(effect => {
      effect()
    })
  }
}

function effectWatch(effect) {
  // 全局变量存储
  currentEffect = effect
  // 第一次调用 为什么会有 请看 47 行
  effect()
  // 释放
  currentEffect = null
}

// 仔细看这一步 有没有和 ref 很像！
// 同样是先声明了一个响应式对象
const dep = new Dep(10)

let b
// 这里的 effectWatch 调用他需要让他自己 执行一次 所以 有了 第 38 行代码
effectWatch(() => {
  // 调用的时候同时获取到了 dep.value
  // dep.value 获取到值得时候 dep 类中的 get value 收集依赖
  b = dep.value + 10
  console.log(b)
})

// 值更新了 会触发 dep 类中的 set value 触发依赖
dep.value = 20