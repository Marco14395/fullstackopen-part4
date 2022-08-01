const blogsRouter = require('express').Router();
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then( blogs => response.json(blogs) )
                 .catch( err => console.error(err) )
})
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)  
    blog.save().then(result => response.status(201).json(result) )
               .catch(err => console.err(err))
})

module.exports = blogsRouter;