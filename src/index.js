const express = require('express');
const app = express();
const connectDB = require('./config/database');

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
  console.log("server is running on port 3000");
});
})
.catch((err)=>{
    console.error("Database connection failed", err);
});
