// require 执行过程
// Module._resolveFilename 解析出当前引用文件的绝对路径
// 加载前 先看一下模块是否被缓存过 如果缓存过了直接返回，没缓存过则增加一个缓存模块
// 是否是内置模块，不是就创建一个模块 模块有两个属性 一个叫 id = 文件名， exports = {}
// 将模块放到缓存中
// 加载这个文件 Module.load
// 拿到文件的扩展名 根据扩展名来调用对应的方法
// 读取文件 加一个自执行函数，将代码放入 最后返回

/**
 * 每个模块都有一个自执行的方法，分别有以下参数  详情请看 Module._extensions['.js'] 方法
 */

// 模拟实现
let fs = require('fs')
let path = require('path')
let vm = require('vm')

function Module (id) {
  this.id = id
  this.exports = {}
}

// module 拓展
Module._extensions = Object.create(null)
Module._cache = {}; // 缓存对象
Module.wrapper = [
  '(function(module, exports, require, __filename, __dirname){',
  '})'
]

function requireMe(fileName) {
  // 获取绝对路径
  let absPath = module._resolveFileName(fileName)
  // 判断是否有缓存， 如果缓存过了，则直接将exports 对象返回
  if(Module._cache[absPath]) {
    return Module._cache[absPath].exports
  }
  // 是否内置模块 这里原生方法判断 暂模拟不了
  // 生成模块实例 
  let module = new Module(absPath)
  // 存入缓存
  Module._cache[absPath] = module
  // 加载模块
  module.load()
  // 输出模块的 exports 属性
  return module.exports
}


Module.prototype.load = function() {
  // 获取到 文件名的扩展名
  let extName = path.extName(this.id)
  // 执行 扩展名下属的方法
  Module._extensions[extName](this)
}

// 解析出当前引用文件的绝对路径
Module._resolveFileName = function(fileName) {
  // 获取路径
  fileName = path.resolve(fileName)
  // 获取文件扩展名
  let flag = path.extname(fileName)
  // 判断是否存在扩展名 如果没有则用 .js
  let extName = flag ? flag : '.js'
  // 如果存在扩展名 则直接返回文件名称， 如果不存在扩展名 则 拼接起来返回
  return flag ? fileName : (fileName + extName)
}

Module._extensions['.js'] = function(module) {
  // 同步读取文件
  let content = fs.readFileSync(module.id, 'utf8')
  // 字符串方法模板 （给文件包了一层函数）
  let strTemplate = Module.wrapper[0] + content + Module.wrapper[1]
  // 编译代码，在当前全局变量的上下文中运行代码 返回输出
  let fn = vm.runInThisContext(strTemplate)
  fn.call(module.exports, module, module.exports, requireMe)
}

// JSON 就是直接将结果放到 module.exports 上
Module._extensions['.json'] = function(module) {
  // 读取文件
  let content = fs.readFileSync(module.id, 'utf8')
  // 直接将字符串结果 变成对象 放到module.exports 上
  module.exports = JSON.parse(content)
}



