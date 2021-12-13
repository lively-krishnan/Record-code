import Stack from './stack-arr'
/**
 * 进制转换
 * @description
 * 我们只需要改变一个地方。 再将十进制转成二进制时，余数是0 或 1；
 * 再将十进制转成八进制的时候 ，余数是 0 ~ 7
 * 十进制 转成十六进制的时候， 余数是 0 ~ 9 + A、B、C、D、E、F(对应10，11，12，13，14，15)
 * 因此，我们需要对栈中的数字做个转化才可以 
 * 也就是 字母A代表基数11 字母B代表基数12 依次类推
 */
function baseConverter(decNumber, base) {
  const remStack = new Stack()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let baseString = ''

  if(!(base >= 2 && base <= 36)) return ''

  while(number > 0) {
    rem = Math.floor(number & base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }
  
  while(!remStack.isEmpty()){
    baseString += digits[remStack.pop()]
  }

  return baseString
}

baseConverter(100003, 2)