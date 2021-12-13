// promise 串行输出

const createPromise = function (timeout) {
  let promise = () => {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve(`等待 ${timeout} 秒`)
      }, timeout * 1000);
    })
  }

  return promise
}

let arr = [createPromise(1), createPromise(2), createPromise(3), createPromise(4)]

const fun = async function (arr) {
  for(let key of arr) {
    let result = await key()
    console.log(result,'======');
  }
}

fun(arr)
