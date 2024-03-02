const Note = require('./note')
const User = require('./user')
const Blog = require('./blog')

User.hasMany(Note)
Note.belongsTo(User)
Blog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Blog, { foreignKey: 'userId' });
Note.sync({ alter: true })
User.sync({ alter: true })
Blog.sync({ alter: true })

module.exports = {
    Note, User, Blog
}