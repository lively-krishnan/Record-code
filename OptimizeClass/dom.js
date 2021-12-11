/**
 * 如何减少DOM 操作
 */
const list = document.getElementById('list')
// 创建一个文档片段， 此时还没有插入到Dom 结构中
const flag = document.createDocumentFragment()

for(let i = 0; i < 20; i++) {
  const li = document.createElement('li')
  li.innerHTML = `list item ${i}`

  flag.appendChild(li)
}
// 都完成之后， 在用统一插入到 Dom 结构中
list.appendChild(flag)


// 深拷贝
function deepClone(obj = {}) {
  // 过滤基本类型: 判断是否不等于object 类型，是则直接返回 当前 obj
  if (typeof obj !== 'object' || obj == null) return obj
  // 判断原型是否为数组
  let result = obj instanceof Array ? [] : {}
  // hasOwnProerty：判断是否有指定的键值，如果有则返回true
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
// 数组去重
function unique(arr){
  const set = new Set(arr)
  return [...set]
}


// 深度扁平化
function flatRen(arr) {
  // 判断是否还有深层数组
 const isDeep = arr.some(item => item instanceof Array)
 if(!isDeep){
   return arr
 }
 const res = Array.prototype.concat.apply([], arr)
 return flatRen(res)
}

// requestAnimationFrame
// 60 帧/s , 3s 180帧， 每次变化3px
// window.requestAnimationFrame

// 如何性能优化，从哪几个方面考虑

// 原则: 多使用内存、缓存，减少计算、减少网络请求
// 方向: 加载页面，页面渲染，页面操作流畅度
