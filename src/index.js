const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.use(express.json()); // midldleware to parse JSON bodies


app.post("/signup", async(req, res)=>{
  const user = new User(req.body);

  try{
    await user.save();
    res.status(201).send("User created successfully");

  }catch(err){
    res.status(400).send("Error creating user: " + err.message);

  }
});

connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
  console.log("server is running on port 3000");
});
})
.catch((err)=>{
    console.error("Database connection failed", err);
});
