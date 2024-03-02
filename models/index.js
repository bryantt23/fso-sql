const Note = require('./note')
const User = require('./user')
const Blog = require('./blog')

User.sync()
Note.sync()
Blog.sync()

module.exports = {
    Note, User, Blog
}