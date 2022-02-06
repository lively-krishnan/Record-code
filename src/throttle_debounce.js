/**
 * 节流
 * 事件被触发，N秒之内只执行一次事件处理函数
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
 * N秒内只要触发事件，就重新计时， 处理函数将永远不能执行
 */
function debounce(fn, delay, immediate = false) {
  let timer = null,
  res;
  const debounced = (...args) => {
    timer && clearTimeout(timer)

    if(immediate) {
      const exec = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay);

      if(exec) {
        res = fn.apply(this, args)
      }
    }else {
      timer = setTimeout(() => {
        res = fn.apply(this, args)
      }, delay);
    }

    return res
  }

  debounced.remove = () => {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}
