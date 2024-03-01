require('dotenv').config()

const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // },
});


class Blog extends Model { }
// Initialize the model
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: { // Assuming you want to include an 'author' field based on your initial request
        type: DataTypes.STRING,
        allowNull: false // Assuming author should not be null
    },
    url: { // Adding 'url' field based on your initial request
        type: DataTypes.STRING,
        allowNull: false // Assuming URL should not be null
    },
    title: { // Adding 'title' field based on your initial request
        type: DataTypes.STRING,
        allowNull: false // Assuming title should not be null
    },
    likes: { // Including 'likes' field based on your initial request
        type: DataTypes.INTEGER,
        defaultValue: 0 // Assuming likes can start at 0 and can be null, thus no 'allowNull' needed
    },
}, {
    sequelize,
    modelName: 'Blog', // Sequelize automatically looks for the plural form of your model name
    underscored: true,
    timestamps: false
});
Blog.sync()

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

// app.post('/api/blogs', async (req, res) => {
//     try {
//         const blog = await Blog.create(req.body)
//         return res.json(blog)
//     } catch (error) {
//         return res.status(400).json({ error })
//     }
// })

// app.put('/api/blogs/:id', async (req, res) => {
//     const blog = await Blog.findByPk(req.params.id)
//     if (blog) {
//         console.log(blog.toJSON())
//         blog.important = req.body.important
//         await Blog.save()
//         res.json(blog)
//     } else {
//         res.status(404).end()
//     }
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})