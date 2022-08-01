const lodash = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (array) => {
    return array.reduce((a, b) => a + b.likes, 0)
}
 
const favoriteBlog = (array) => {
    return array.sort((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = (array) => {
   const theBlogs = array.map(blog => {
    return {author: blog.author};
   });
   const mergedBlog = theBlogs.reduce((result, item) => {
     const { author } = item;
     const itemIndex = result.findIndex((item) => item.author === author);
     if (itemIndex === -1)
     {
         result.push({author, blogs: 1});
     } else {
         result[itemIndex].blogs++;
     }
    return result;
   },[])
   return mergedBlog.sort((a, b) => b.blogs - a.blogs)[0];
}

const mostLikes = (array) => {
    const theBlogs = array.map(blog => {
     return {author: blog.author, likes: blog.likes};
    });
    const mergedBlog = theBlogs.reduce((result, item) => {
      const { author, likes } = item;
      const itemIndex = result.findIndex((item) => item.author === author);
      if (itemIndex === -1)
      {
          result.push({author, likes});
      } else {
          result[itemIndex].likes += item.likes;
      }
     return result;
    },[])
    return mergedBlog.sort((a, b) => b.likes - a.likes)[0];
 }

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }