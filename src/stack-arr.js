
class Stack {
  constructor() {
    this.count = 0
    this.items = []
  }
  // 添加一个 或几个 新元素到栈顶 也就是栈的末尾
  push(element){
    this.items[this.count].push(element)
    this.count++
  }
  // 移除栈顶的元素，同时返回被移除的元素
  pop(){
    if (this.isEmpty()) return undefined
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  // 返回栈顶的元素， 不对栈做任何修改
  peek(){
    if(this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }
  // 如果栈里没有任何元素就返回true， 否则返回false
  isEmpty(){
    return this.count === 0
  }
  // 移除栈里的所有元素
  clear(){
    while(!this.isEmpty()){
      this.pop()
    }
  }
  // 返回栈里的元素个数
  size(){
    return this.count
  }
  toString(){
    if(this.isEmpty()) return ''
    let objString = `${this.items[0]}`
    for(let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }
}

export default Stack