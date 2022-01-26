function myNew (constructor, ...args) {
  if (typeof constructor != 'function') throw new TypeError(`${constructor} is not a constructor!`);
  let obj = Object.create(constructor.prototype)
  let result = constructor.apply(obj, args)
  return result instanceof Object ? result : obj
}
