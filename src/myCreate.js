function myCreate(data) {
  let result = null
  let toStr = Object.prototype.toString.call(data).slice(8, -1)
  let typeDefined = {
    "Null": function() {
      result = new function(){}
      result.__proto__ = null
    },
    "Array": function() {
      result = new function Array(){}
      result.__proto__ = data
    },
    "Object": function() {
      result = new function Object(){}
      result.__proto__ = data
    },
    "Function": function() {
      result = new function Function(){}
      result.__proto__ = data
    }
  }
  if(!typeDefined[toStr]) {
    throw new TypeError(`Object prototype may only be an Object or null: ${data}`)
  }
  typeDefined[toStr]()
  return result
}
