const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000,function(){
  console.log("Server use port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
  //Obtain data from signup.html
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  //Set signup data to send to the mailchimp API.
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
  //Set options object that contains the URL, Authentication info and data to send to the mailchimp API.
  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/fe125f96d5",
    method:"POST",
    headers: {
      "Authorization": "iissaaiiaass 53f78c762f2596c3ca5dc9ba3351feb9-us4"
    },
    body: jsonData
  }
  //Set reuest object who make the post request to the mailchimp API.
  request(options,function(error,response,body){
    if(response.statusCode == 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post("/failure", function(req,res){
  res.redirect("/");
})



//53f78c762f2596c3ca5dc9ba3351feb9-us4 --User API Key for Authentication
//fe125f96d5 --List Id
