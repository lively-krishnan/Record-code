// @ts-nocheck
/**
 * 快速排序 的时间复杂度
 * 递归的时间复杂度是 O(logN)
 * 分区操作的时间复杂度是 O(n)
 * 时间复杂度 O(n * logN)
 * @description
 * 选择一个基准值
 * 分区： 根据基准值比较，小的放入left 数组，大的放入right 数组
 * 递归循环以上操作，当传入数组的长度等于1时，结束递归
 */
Array.prototype.quickSort = function() {
  const rec = (arr) => {
    if(arr.length === 1) return arr
    const left = []
    const right = []
    const mid = arr[0]

    for(let i = 1; i < arr.length; i++) {
      if(arr[i] < mid) {
        left.push(arr[i])
      }else {
        right.push(arr[i])
      }
    }
  
    return [...rec(left), mid, ...rec(right)]
  };
  const res = rec(this)
  res.forEach((n, i) => this[i] = n)
  return this
}

const arr = [2,3,4,2,1]
arr.quickSort()
