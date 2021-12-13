/**
 * 节流
 * 短时间内多次操作，只执行第一次调用
 */

function throttle(fn, dealy) {
  // 上一次的调用时间
  let last = 0
  return (...args) => {
    // 一段时间内 只有第一次被调用
    const now = Date.now()
    if(now > last + delay) {
      fn.apply(this, args)
      last = now
    }
  }
}


/**
 * 防抖
 * 短时间内多次操作，以最后次结果为准
 */

function debounce(fn, delay){
  let timer
  return (...args) => {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}