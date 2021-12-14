// 模拟vue3 reactive effectWatch

let currentEffect;
class Dep{
  constructor(val) {
    // 声明存储
    this.effects = new Set()
    // 传入值
    // this._val = val
  }
  // 这里注释的代码 ，用于 模拟reactive 
  // let dep = new Dep(10) 时候用到
  // 获取到值得时候 去收集依赖
  // get value() {
  //   this.depend()
  //   return this._val
  // }
  // // 更改值得时候 去触发依赖
  // set value(newVal) {
  //   this._val = newVal
  //   this.notify()
  // }
  // 收集依赖
  depend() {
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
// 设置 targetMap 存储, 为每一个key 提供一个 dep
const targetMap = new Map()
function getDep(target, key) {
  let depsMap = targetMap.get(target)
  // 如果取不到 第一次 初始化操作  这里设置的是 target 对象属性， value map 集合
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  // 这里要做一层映射 map 内是否有这个key
  let dep = depsMap.get(key)
  // 第一次取不到 初始化操作 这里设置的是 key 属性， value 是 dep
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      // return target[key] 
      const dep = getDep(target, key)
      // 依赖收集
      dep.depend()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const dep = getDep(target, key)
      // 这里 Reflect.set 会返回一个 Boolean 值表明 是否成功设置属性
      const result = Reflect.set(target, key, value)
      // 这里 一定得是设置完后通知
      dep.notify()
      return result
    }
  })
}

function effectWatch(effect) {
  // 全局变量存储
  currentEffect = effect
  // 为什么这里需要调用一次，哪里需要调用， 为什么
  effect()
  // 释放
  currentEffect = null
}

const dep = reactive({
  age: 18
})

let b
effectWatch(() => {
  // 调用的时候同时获取到了 dep.value
  // dep.value 获取到值得时候 dep 类中的 get value 收集依赖
  b = dep.age + 10
  console.log(b) // 打印结果 调用俩次 第一次 28 第二次 30 
})

// 值更新了 会触发 dep 类中的 set value 触发依赖
dep.age = 20




