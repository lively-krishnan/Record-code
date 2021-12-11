/**
 * 在数组开头插入元素
 * 采用移动数组的位置后 改变第一位数据
 * @param {*} value 
 */
// @ts-ignore
Array.prototype.insertFirstPosition = function (value) {
  for(let i = this.length; i >0; i--){
    this[i] = this[i - 1]
  }
  this[0] = value
}
const arr = [1, 2, 3, 4]
// @ts-ignore
arr.insertFirstPosition(10)
console.log(arr); // [ 10, 1, 2, 3, 4 ]