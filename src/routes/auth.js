const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

authRouter.post("/signup", async(req, res)=>{
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


authRouter.post("/login", async(req, res)=>{
 try{
  const { email, password } = req.body;

  const user = await User.findOne({email: email});
  if(!user){
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await user.validatePassword(password);

  if(isPasswordValid){
    // create jwt token
    const token = await user.getJWT();

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

module.exports = authRouter;