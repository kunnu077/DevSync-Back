const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const { validateSignUpData } = require('./utils/validation');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth.js');

const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const requestRouter = require('./routes/requests.js');  

app.use(express.json());

app.use(cookie());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);  



connectDB().then(()=>{
    console.log("Database connected successfully............");
    app.listen(3000,()=>{
  console.log("server is running on port 3000........................");
});
})
.catch((err)=>{
    console.error("Database connection failed", err);
});
