const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const { validateSignUpData } = require('./utils/validation');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('../middlewares/auth');

app.use(express.json());

app.use(cookie());
// midldleware to parse JSON bodies

// api for signu
app.post("/signup", async(req, res)=>{
  try{
  // const user = new User(req.body)
  validateSignUpData(req);

  const {firstName, lastName, email, password} = req.body;

  //encrypt password
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);

  //creating new instance of user model
  const user = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,

  });

  await user.save();
    res.status(201).send("User created successfully");

  }catch(err){
    res.status(400).send("Error creating user: " + err.message);

  }
});

app.get("/profile", userAuth,async (req, res)=>{
try{
  const user = req.user;
  res.send(user);
}catch(err){
  res.status(500).send("Error fetching profile: " + err.message);
}

});


app.post("/login", async(req, res)=>{
 try{
  const { email, password } = req.body;

  const user = await User.findOne({email: email});
  if(!user){
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(isPasswordValid){
    // create jwt token
    const token = await jwt.sign({_id: user._id},"kunal");

    // add the token to cookie
    res.cookie("token", token);
    res.status(200).send("Login successful");
  } else{
    throw new Error("Invalid email or password");
  }
 }catch(err){
    res.status(400).send("Error logging in: " + err.message);
 }
});
 

// get api for feed
app.get("/user", async(req,res)=>{
  const userEmail = req.body.email;
  try{
    const user = await User.findOne({email: userEmail});
    if(!user){
      return res.status(404).send("User not found");
    } else{
      res.send(user);
    }
  }
  catch(err){
    res.status(500).send("Error fetching user: " + err.message);
  }
});

//api for delete user
app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  }catch(err){
    res.status(500).send("Error deleting user: " + err.message);
  }
});

// api for update user 
app.patch("/user", async(req,res)=>{
  const userId = req.params.userId;
  const data = req.body;

  try{
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "photoUrl", "about", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k)=> 
      ALLOWED_UPDATES.includes(k)
  );
  if(!isUpdateAllowed){
    throw new Error("Invalid updates!");
  }
  const user = await User.findByIdAndUpdate({_id: userId}, data,{
    returnDocument: "after",
    runValidators: true,
  });
  console.log(user);
  res.status(200).send("User updated successfully");
}catch(err){
    res.status(500).send("Error updating user: " + err.message);
}
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
