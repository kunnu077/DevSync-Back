const express = require('express');
const app = express();


const {adminAuth, userAuth} = require('../middlewares/auth');

app.use("/admin", adminAuth, (req, res)=>{
    res.send("Admin authenticated successfully");
});
app.use("/user", userAuth, (req, res)=>{
    res.send("User authenticated successfully");
});


// app.use("/",(req, res)=>{
//     res.send("Hello World");
// })

// app.use("/home",(req, res)=>{
//     res.send("Hello home");
// })

app.use("/",(err, req, res, next)=>{
  if(err){
    res.status(404).send("Route not found");
  }
});

app.listen(3000,()=>{
  console.log("server is running on port 3000");
})