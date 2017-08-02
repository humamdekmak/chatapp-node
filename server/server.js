const path = require('path');
const express = require('express');
var app = express();

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);
app.use(express.static(publicPath));



app.listen(port,process.env.IP, () =>{
console.log(`the server is listening ${port}`);
})