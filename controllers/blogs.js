const router = require('express').Router()

const Blog = require('../models/blog')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

router.post('/', async (req, res) => {
    try {
        console.log("🚀 ~ router.post ~ req.body:", req.body)

        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Blog.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.status(204).end(); // No content to send back, but signifies successful deletion
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while attempting to delete the blog' });
    }
});
module.exports = router