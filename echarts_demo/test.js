var fs = require("fs");

fs.readFile('data.csv', {flag: 'r', encoding: 'utf-8'}, function (err, data) {
    var table = new Array();
    if (err) {
        console.log(err.stack);
        return;
    }
    console.log(data.toString())
    ConvertToTable(data, function (value) {
        console.log(value);
    })
});
console.log("程序执行完毕");

function ConvertToTable(data, callBack) {
    data = data.toString();
    // var table = new Array();
    // var rows = new Array();
    data = data.split("\r\n");
    data = data.splice(0, data.length - 1)
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split(',')
    }
    callBack(data);
}