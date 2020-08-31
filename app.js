const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const ejs = require("ejs");
var items =["Buy Food","Cook Food"];
var workItems =[];
app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  var today = new Date();

  var options ={
    weekday : "long",
    day : "numeric",
    month : "long",
  };
  var day = today.toLocaleDateString("en-US",options);

  res.render('list', {listTitle : day,newListItems:items });
});




app.post("/",function( req,res){
  let item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/Work");
  }else{
    items.push(item);
    res.redirect("/");
  }


});

app.get("/Work",function(req,res){
  res.render("list",{listTitle: "Work List",newListItems:workItems});
});

app.listen(process.env.PORT||3000,function(){

  console.log("Server started .........");
});
