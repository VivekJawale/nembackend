const express = require('express');
const { PostModel } = require("../models/post.model");
const postrouter = express.Router();

postrouter.get("/", async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.send(posts)
    } catch (error) {
        res.send(error)
    }
})

postrouter.post("/create", async (req, res) => {
    const data = req.body
    try {
        const post = new PostModel(data);
        await post.save();
        res.send("Post added :" + post)
    } catch (error) {
        res.send(error)
    }
})

postrouter.patch("update/:id", async (req, res) => {
    const ID = req.params.id;
    const data = req.body;
    try {
        const post = await PostModel.findOne({ _id: ID })
        const userId = post.userId;
        const usermakingId = req.body.userId;
        if (userId == usermakingId) {
            await PostModel.findByIdAndUpdate({ _id: ID }, data);
            res.send("Post updated successfully")
        } else {
            res.send("you are not authorized")
        }
    } catch (error) {
        res.send(error)
    }
})

postrouter.delete('/delete/:id', async (req, res) => {
    const ID = req.params.id;
    try {
        const post = await PostModel.findOne({ _id: ID })
        const userId = post.userId;
        const usermakingId = req.body.userId;
        if (userId == usermakingId) {
            await PostModel.findByIdAndDelete({ _id: ID });
            res.send("Post deleted successfully")
        } else {
            res.send("you are not authorized")
        }
    } catch (error) {
        res.send(error)
    }
})
module.exports = {
    postrouter
}