const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth.js');
const User = require('../models/user');

requestRouter.post ("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;

    console.log("sending connection request to ");
     
    res.status(200).send("Connection request sent");
});

module.exports = requestRouter;