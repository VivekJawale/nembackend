const express = require("express");
require("dotenv").config();
const { connection } = require("./configs/db");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

const { authentication } = require("./middleware/authentication.middleware");
const { userrouter } = require("./routes/user.route")
const { postrouter } = require("./routes/post.route")

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to 3 ghante me bane facebook me");
})
app.use("/user", userrouter);
app.use(authentication);
app.use("/posts", postrouter)


app.listen(PORT, async () => {
    try {
        await connection;
        console.log("DB connected successfully");
        
    } catch (error) {
        console.log("Error while connecting to db", { error });
    }
    console.log(`server runing on port http://localhost:${PORT}/`)
})