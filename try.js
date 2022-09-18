var data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:fname;
        LNAME:lname;
      }
    }]}
var dat=JSON.stringify(data);
const options={
  method:"POST",
  auth:"xxx:yyy"
}
const request = https.request(url,options,function(response){
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
  request.write(dat);
  request.end();
});
