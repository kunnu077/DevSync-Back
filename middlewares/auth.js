const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const token = "xyz";
    const isAdminAuthenticated = token === "xyzz";
    if (!isAdminAuthenticated) {
        res.status(403).send("Admin not authenticated");
    } else {
        next();
    }
};

const jwt = require('jsonwebtoken');
const User = require('../src/models/user');


const userAuth = async (req, res, next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Invalid token");
        }
        const decodedMessage  = jwt.verify(token, "kunal");

        const {_id} = decodedMessage;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).send("Unauthorized: " + err.message);
    }
   
}

module.exports = {adminAuth, userAuth};