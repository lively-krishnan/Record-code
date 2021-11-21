class Methods {
    constructor(name) {
        console.log('输出: -----------------------')
        this.taskQueue = []
        // 打个招呼哟
        this.taskQueue.push(this.generate(`Hi! This is ${name}`))
        console.log(this.taskQueue);
        setTimeout(() => { this.next() }, 0)
        return this
    }
    next() {
        let fn = this.taskQueue.shift()
        fn && fn()
    }
    eat(food) {
        // 吃点啥呢
        this.taskQueue.push(this.generate(`eat ${food} ~~`))
        return this
    }
    sleep(waiting) {
        this.taskQueue.push(this.waitAMinute(waiting))
        return this
    }
    sleepFirst(waiting) {
        // 添加到开头 优先执行
        this.taskQueue.unshift(this.waitAMinute(waiting))
        return this
    }
    // 生成方法
    generate(content) {
        return () => {
            console.log(content)
            this.next()
        }
    }
    // 得等会~~ 
    waitAMinute(waiting) {
        return () => {
            setTimeout(() => {
                console.log(`等待 ${waiting} 秒..`)
                this.next()
            }, waiting * 1000)
        }
    }
}

const CodingMan = async function (selector) {
    let demo = new Methods(selector)
    return await demo
}

// CodingMan('karson') 
// CodingMan('karson').eat('香蕉').eat('鸡腿')
// CodingMan('karson').sleep(2).eat('香蕉')
// CodingMan('karson').sleepFirst(2).eat('鸡腿')
// CodingMan('karson').sleep(2).sleep(3)
