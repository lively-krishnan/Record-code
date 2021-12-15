
// 基于TCP 协议实现http 服务
import { createServer } from 'net'

const server = createServer(client => {
  // 接受客户端数据
  console.log(client)
  client.on('data', data => {
    client.write(`HTTP/1.1 200 OK\r
    Content-Type: text/html\r
    Content-Length: 14\r\n
    <h1>hello world!</h1>
    `)
    // 关闭连接
    client.end()
  })
})


server.listen({
  host: '127.0.0.1',
  port: 3000
})


// 为什么是三次握手 而不是两次或四次
/**
 * 为了防止已失效的连接的请求报文突然又传送到了服务器而产生的错误.
 * client 发出的第一个连接请求报文并没有丢失，而是在某个网络结点长时间滞留，
 * 导致延误到连接释放以后才到达server。
 * 本来这是一个早已经失效的报文。 但server 收到此失效的连接请求报文后，误认为是 client
 * 再次发出的一个新的连接请求。 于是就向client 发出确认报文，同意建议连接。
 *
 * 假设
 *
 */

// 三次握手
// 在吗，能不能建一个连接
// 在，可以建立，但是我需要你确认是否连接上了
// 我这边连接好了，可以传输数据了

// 四次挥手

// 客户端发送关闭请求
// 服务器和他说等等， 等数据全部传输完毕后执行
// 数据传输完毕了
// 数据我都接受到了，发送关闭请求

