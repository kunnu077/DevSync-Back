const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.post("/signup", async(req, res)=>{

//creating instance of the user model
const user = new User({
    firstName: "Kunal",
    lastName: "Kushwah",
    email: "kunal@example.com",
    password: "password123",
    age: 25,
    gender: "Male"
});

await user.save();
res.send("User signed up successfully");

});

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
  console.log("server is running on port 3000");
});
})
.catch((err)=>{
    console.error("Database connection failed", err);
});
