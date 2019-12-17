const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000,function(){
  console.log("Server use port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})
