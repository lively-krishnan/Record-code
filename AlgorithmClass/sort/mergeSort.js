// @ts-nocheck
/**
 * 归并排序 的时间复杂度
 * 分的时间复杂度是 O(logN)
 * 合的时间复杂度是O(n)
 * 时间复杂度 O(n* logN)
 * @description
 * 分: 把数组劈成两半，在递归地对子数组进行 “分” 操作， 知道分成一个个单独的数
 * 合: 把两个数 合并为有序数组，在对有序数组进行合并，直到全部子数组合并为一个完整数组
 *  
 */
Array.prototype.mergeSort = function () {
  const rec = (arr) => {z
    if(arr.length === 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid, arr.length)
    const orderLeft = rec(left)
    const orderRight = rec(right)

    const res = []
    while(orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
      } else if(orderLeft.length) {
        res.push(orderLeft.shift())
      } else if(orderRight.length) {
        res.push(orderRight.shift())
      }
    }
    return res
  }
  const res = rec(this)
  res.forEach((n, i) => this[i] = n)
  return this
}

const arr = [2,3,1,23,21,56]
const s = arr.mergeSort()
console.log(s);