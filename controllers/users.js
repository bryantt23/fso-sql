const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { User } = require('../models')
const { Note } = require('../models')
const { Blog } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [{
            model: Note
        }, {
            model: Blog,
            attributes: ['id', 'title', 'url', 'likes'] // Adjust attributes as needed
        }]
    })
    res.json(users)
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        console.error('Error updating user:', error);
        next(error)
    }
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

router.put('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.id } })
        if (user) {
            user.username = req.body.username
            await user.save()
            res.json(user)
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ error: 'An error occurred while attempting to update the user' });
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (!user || password !== 'password') {
        return res.status(401).json({ error: 'invalid username or password' });
    }
    const userForToken = {
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router