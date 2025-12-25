const adminAuth = (req, res, next)=>{
    console.log("Admin auth is getting checked");
    const token ="xyz";
    const isAdminAuthenticated = token === "xyzz";
    if(!isAdminAuthenticated){
        res.status(403).send("Admin not authenticated");
    }else{
        next();
    }
};

const userAuth = (req, res, next)=>{
    console.log("User auth is getting checked");
    const token ="abc";
    const isUserAuthenticated = token === "abc";
    if(!isUserAuthenticated){
        res.status(403).send("User not authenticated");
    }else{
        next();
    }
}

module.exports = {adminAuth, userAuth};