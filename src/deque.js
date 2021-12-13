/**
 * @title 双端队列
 * @desc 使用双端队列解决回文数问题
 */

function palindromeChecker(aString) {
  if(aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
    return false
  }
  
  const deque = new Deque()
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let isEqual = true
  let firstChar, lastChar

  for(let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i))
  }

  while(deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeFront()
    if(firstChar !== lastChar) {
      isEqual  = false
    }
  }

  return isEqual
}