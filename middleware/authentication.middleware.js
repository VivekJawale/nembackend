const jwt = require("jsonwebtoken");
const express = require("express");
const SecretKey = process.env.SECRET_KEY
const authentication = async (req, res, next) => {
    const token = req.headers.token;
    try {
        if (!token) {
            return res.send("Please Login")
        } else {
            const decoded = jwt.verify(token, SecretKey);
            const Userid = decoded.userId;
            if (req.body.userId = Userid) {
                next()
            } else {
                res.send("User not verified")
            }
        }
    } catch (error) {
        res.status(401).send({ "message": "Please login again" });
    }
}

module.exports = { authentication };