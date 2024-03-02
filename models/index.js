const Note = require('./note')
const User = require('./user')
const Blog = require('./blog')

User.hasMany(Note)
Note.belongsTo(User)
Note.sync({ alter: true })
User.sync({ alter: true })
Blog.sync()

module.exports = {
    Note, User, Blog
}