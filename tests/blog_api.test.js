const mongoose = require('mongoose')
const supertest = require('supertest');
const app = require("../app");
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [{
    title: "d",
    author: "Marco",
    url: "dsa"
}]


beforeEach(async() => {
    //刪除所有blog
    await Blog.deleteMany({});
    //新增initial blogs
    await Blog.insertMany(initialBlogs)
})

test("if get request returns correct amount of blogs?", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
})

test("if the posts have unique ids", async() => {
    const response = await api.get("/api/blogs");
    const body = response.body;
    body.map(el => expect(el.id).toBeDefined());
})

test("if new posts are correctly posted to the database", async () => {
    const blog = {
        title: "L",
        author: "Bruce Wayne",
        url: "www.pornhub.com",
    }
    await api.post("/api/blogs")
             .send(blog)
             .expect(201)
             .expect('Content-Type', /application\/json/)

    const response = await api.get("/api/blogs");

    const titles = response.body.map(el => el.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1);

    expect(titles).toContain("L");
})

test("if likes are missing", async() => {
    const response = await api.get("/api/blogs");

    const definedLikes = response.body.map(el => {
        if(!el.likes){el.likes = 0}
        return el
    })
    definedLikes.map(el => expect(el.likes).toBe(0))
})

test("if contents are missing", async() => {
    const blog = {author: "Andrew Dickinson"};
    
    const response = await api.post("/api/blogs")
                              .send(blog)
    
    expect( response.status ).toEqual( 404 )
})

test("can update info", async() => {
    const updatedBlog = {
            "title": "ass",
            "author": "Marco",
            "url": "asd",
            "id": "62e9d3ea5f760b0232c9ff5f"
        }
    await api.put("/api/blogs/62e9d3ea5f760b0232c9ff5f")
             .send(updatedBlog)
             .expect(200)
})

test("can delete", async() => {
    await api.delete(`/api/blogs/${id}`)
             .expect(204)
})

afterAll(() => {
    mongoose.connection.close()
})