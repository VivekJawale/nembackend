const express = require('express');
const { UserModel } = require("../models/post.model");
const userrouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")



userrouter.post("/register", async (req, res) => {
    const { email, password, name, gender } = req.body;
    try {
        const hashedpass = await bcrypt.hash(password, bcrypt.genSaltSync(10));
        const user = new UserModel({ name, email, gender, password: hashedpass });
        await user.save();
        res.send("registered")
    } catch (error) {
        res.send(error.message)
    }
})

userrouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            let result = await bcrypt.compare(password, user.password);
            if (result) {
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
                res.send({ msg: "logged in", token })
            } else {
                res.send("wrong credentials")
            }
        } else {
            res.send("Please register")
        }
    } catch (error) {
        res.send(error.message)
    }
})

module.exports={
    userrouter
}