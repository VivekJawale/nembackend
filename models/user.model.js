const mongoose = require('mongoose')
// name ==> String
// email ==> String
// gender ==> String
// password ==> String

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
}, {
    versionKey: false,
    timestamps: true,
})

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };