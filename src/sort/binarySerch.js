/**
 * 二分查找
 * 时间复杂度: O(logN)
 * @description
 * 从数组中间开始，如果正好是目标值，则搜索结束
 * 如果目标值 大于或者小于中间元素，则在大于或小于中间元素的那一半数组中搜索
 */
Array.prototype.binarySearch = function (target) {
  let low = 0
  let high = this.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = this[mid]
    if (element < target) {
      low = mid + 1
    } else if (element > target) {
      high = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

// const res = [1, 2, 3, 4, 5].binarySearch(0)
// console.log(res)
