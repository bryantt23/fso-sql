const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}

const tokenExtractor = (req, res, next) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    req.user = decodedToken
    next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        include: [{ model: User, attributes: ['id', 'username', 'name'] }]
    })
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const body = req.body
        if (!req.user.id) {
            return res.status(401).json({ error: 'token missing or invalid' });
        }
        console.log("🚀 ~ router.post ~ req.body:", req.body)
        const blog = await Blog.create({ ...body, userId: req.user.id })
        return res.json(blog)
    } catch (error) {
        console.log("🚀 ~ router.post ~ error:", error)
        next(error)
        // return res.status(400).json({ error })
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findByPk(id)
        if (blog) {
            blog.likes = req.body.likes
            await blog.save()
            return res.json(blog.likes)
        }
        else {
            res.status(404).json({ message: "Blog not found" })
        }
    } catch (error) {
        next(error)
        // return res.status(400).json({ error })
    }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findByPk(id)
        console.log("🚀 ~ router.delete ~ blog:", JSON.stringify(blog, null, 4))
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Check if the requesting user is the one who added the blog
        if (blog.userId !== req.user.id) {
            // If not, deny the deletion request
            return res.status(401).json({ error: 'You are not authorized to delete this blog' });
        }

        // If the user is authorized, proceed with deletion
        await Blog.destroy({
            where: { id: id }
        });
        res.status(204).end(); // No content to send back, but signifies successful deletion
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while attempting to delete the blog' });
    }
});
module.exports = router