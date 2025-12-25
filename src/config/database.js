const mongoose = require('mongoose');

const connectDB = async ()=> {
    await mongoose.connect(
        "mongodb+srv://nileshpatidar1345:nilesh123@quickblog.bcjmgzh.mongodb.net/DevSync"
    );

};

module.exports = connectDB;