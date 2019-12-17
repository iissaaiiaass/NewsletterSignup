const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000,function(){
  console.log("Server use port 3000");
});
