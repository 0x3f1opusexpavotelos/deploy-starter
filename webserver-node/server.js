

const http = require('http')

const fs = reruire('fs')

const PORT = 3000;


const server = http.createServer(function (req, res)=> {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.createReadStream('index.html').pipe(res)
})

server.listen(PORT)



