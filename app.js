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

app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  jsonData = JSON.stringify(data);
  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/fe125f96d5",
    method:"POST",
    headers: {
      "Authorization": "iissaaiiaass 53f78c762f2596c3ca5dc9ba3351feb9-us4"
    },
    body: jsonData
  }
  request(options,function(error,response,body){
    if(error){
      console.log(error);
    }else{
      console.log(response.statusCode);
    }
  });

  console.log(firstName + lastName + email);
});



//53f78c762f2596c3ca5dc9ba3351feb9-us4 --User API Key for Authentication
//fe125f96d5 --List Id
