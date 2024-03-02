const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model { }

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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Blog', // Sequelize automatically looks for the plural form of your model name
    underscored: true,
    timestamps: false
});

module.exports = Blog