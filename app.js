const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  var fvname=req.body.fname;
  var lvname=req.body.lname;
  var email=req.body.email;
  //console.log(fvname);
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fvname,
          LNAME:lvname
        }
      }
    ]
  };
  var jsondata=JSON.stringify(data);
  var options={
    url:"https://us6.api.mailchimp.com/3.0/lists/5c67cae3f4",
    method:"POST",
    headers:{
      "Authorization":"sagar f8b742bc3afd0edeba81d1eda97dbbe4-us6"
    },
    body:jsondata
  };
  request(options,function(error,response,body){
    if(error){
      //console.log(error);
      res.sendFile(__dirname+"/failure.html");
    }
    else{
      //console.log(response.statusCode);
      if(response.statusCode==200){
        res.send("thanks u");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }

      }

  });
});
app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(3000,function(){
  console.log("the server is runinng at port 3000");
});

//api key:
//f8b742bc3afd0edeba81d1eda97dbbe4-us6



//list
//5c67cae3f4
