require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('connected to the database')
    } catch (err) {
        console.error('Failed to connect to the database:', err)
        console.log('failed to connect to the database')
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDatabase, sequelize }