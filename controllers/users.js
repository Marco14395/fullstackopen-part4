const bcrypt = require("bcrypt")
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async(request, response) => {
    const {username, name, password} = request.body;
    const existingUser = await User.findOne({ username });
    if(existingUser){
        return response.status(400).json({
            error: 'username must be unique'
          })
    }

    const saltRound = 10;

    const passwordHash = await bcrypt.hash(password, saltRound);
    const user = new User({
        username,
        name,
        password,
        passwordHash
    })
    const savedUser = await user.save();

    response.status(201).json(savedUser)
})

usersRouter.get("/", async(request, response) => {
    const users = await User.find({}).populate("blogs");
    response.json(users)
})

module.exports = usersRouter