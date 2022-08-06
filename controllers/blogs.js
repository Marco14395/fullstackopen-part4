require("dotenv").config();
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs);
})

blogsRouter.get("/:id", async (request, response) => {
    const id = request.params.id;
    const result = await Blog.findById(id);
    if(result === null)
    {
        response.status(404).end();
    }
    response.json(result);
})
  
blogsRouter.post('/', async(request, response) => {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id)
    {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user;
    //structure and contents of new blogs
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes? body.likes: 0,
        user: user.id
    })
    //save the new blog to mongoDB
    const savedBlog = await blog.save();
    //add the new blog to the user's blogs array
    user.blogs = user.blogs.concat(savedBlog);
    //saves the new user data to mongodb
    await user.save();
    //send the respnse back to the request in JSON format
    response.json(savedBlog);
})

blogsRouter.delete("/:id", async(request, response) => {
    const id = request.params.id;
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id)
    {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user;
    const blog = await Blog.findById(id);
    if(blog.user.toString() === user.id.toString())
    {
        await Blog.findByIdAndRemove(id);
        user.blogs = user.blogs.filter(id => id !== id);
        response.status(204).end();
    }
    else {return response.status(401).end();}
})

blogsRouter.put("/:id", async(request, response) => {
    const {title, author, url, likes} = request.body;
    
    const result = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true, runValidators: true, context: 'query' }
    );

    response.json(result)
})

module.exports = blogsRouter;

