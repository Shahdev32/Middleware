const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
 
 
// app.use((req,res,next)=>{
//   //  let {query}= req.query;
//   //  console.log(query);
// console.log("Hi, Iam middleware");
//  return next();
// //console.log("hi i am after next");

// //res.send("middleware finished");
// });
// app.use((req,res,next)=>{
//     //  let {query}= req.query;
//     //  console.log(query);
//   console.log("Hi, Iam middleware2");
//   next();
//   //usually we dont write anything after the middlware next
//   //res.send("middleware finished");
//   });

 // it will only work for those whose path is /random
//  app.use("/random",(req,res,next)=>{
//     console.log("I am only for a random ");
//     next();
//  });

 let checkTocken = (req,res,next)=>{
   let {token} = req.query;
   if(token === "giveaccess")
   {
    next();

   }
   throw new ExpressError(401,"Access Denied");
 };


 app.get("/api", checkTocken,(req,res)=>{
    res.send("data");

 });
//logger - morgan
// app.use((req,res,next)=>{
//     req.time=  new Date(Date.now()).toString() ;
//     console.log(req.method,req.hostname,req.path,req.time);
//     next();
// });
 

//middle ware response send

app.get("/",(req,res)=>{
 res.send("Hi, Iam root");

});

app.get("/random",(req,res)=>{
res.send("this is random page");
});


app.use("/err",(req,res)=>{
 abcd= abcd;
});

app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"Acees to admin is Forbidden");   
});
app.use((err,req,res,next)=>{
   let {status=500,message="some error occured "} = err;
   res.status(status).send( message);

    res.send(err);

})
// app.use((err,req,res,next)=>{
//     console.log("---------------ERROR2---------------");
//     next(err);
// })

// in the last we print 404 whenever we can not find path
// app.use((req,res)=>{
//  res.status(404).send("page not found");
// });

app.listen(8080,(req,res)=>{
    console.log("server is listening to port 8080");

});