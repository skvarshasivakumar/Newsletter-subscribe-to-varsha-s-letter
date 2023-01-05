const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});
app.post("/",function(req,res){
  const fname=req.body.firstname;
  const lname=req.body.lastname;
  const email=req.body.email;
  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{FNAME:fname,
      LNAME:lname}
  }]}
const jsondata=JSON.stringify(data);
const url="https://us18.api.mailchimp.com/3.0/lists/f6d43bc655";
// const url="https://us9.admin.mailchimp.com/lists/members/add?id=1036155";
const options={
  method:"POST",
  auth:"career:3d4b242015e67ea752ae5865b84ede09-us18"
}
const request= https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsondata);
request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server connected on port 3000 successfully");
});
