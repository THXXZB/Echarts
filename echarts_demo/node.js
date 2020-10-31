const http = require('http')
const fs = require('fs')
let list = ''

function ConvertToTable(data, callBack) {
  data = data.toString();
  // var table = new Array();
  // var rows = new Array();
  data = data.split("\r\n")
  console.log('*******',data, data.length)
  // data = data.splice(0, data.length - 1)
  // console.log('-----------', data.length)
  for (let i = 0; i < data.length; i++) {
    data[i] = data[i].split(',')
  }
  callBack(data);
}

function get() {

  // let sheets = fs.readFileSync('data.txt', {flag: 'r', encoding: 'utf-8'})
  // // console.log(sheets)
  // sheets = sheets.split(';')
  // sheets = sheets.splice(0, sheets.length - 1)
  // for(let i = 0; i < sheets.length; i++) {
  //     sheets[i] = sheets[i].replace('\r\n', '')
  //     sheets[i] = sheets[i].split(',')
  // }

  fs.readFile('data.csv', {
    flag: 'r',
    encoding: 'utf-8'
  }, function (err, data) {
    // var table = new Array();
    if (err) {
      console.log(err.stack);
      return;
    }
    // console.log(data.toString())
    ConvertToTable(data, function (value) {
      // console.log(value.length);
      list = value
    })
  });

  // return sheets

}
setInterval(function () {
  // console.log('dfadsf')
  // data = get()
  get()
  console.log('data.length = ', list.length)
}, 5000)

http.createServer((req, res) => {
    const url = require('url').parse(req.url)
    if (url.pathname === '/api/books') {
      // console.log('url.query', url.query)

      const methodName = url.query && url.query.split('=')[1]
      // console.log('methodName', methodName)

      // let list = data
      console.log(`${methodName}(${list.length})`)

      res.end(`${methodName}(${JSON.stringify(list)})`)
    }
  })
  .listen(3002, () => {
    console.log('server is running http://localhost:3002')
  })