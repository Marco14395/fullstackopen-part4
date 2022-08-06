const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true
    },
    name: String,
    password: {
        type: String,
        minLength: 3,
    },
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})

userSchema.set("toJSON", {
    transform: (document, returedObj) => {
        returedObj.id = returedObj._id.toString()
        delete returedObj._id
        delete returedObj.__v
        delete returedObj.passwordHash
        delete returedObj.password
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User