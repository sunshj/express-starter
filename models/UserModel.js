const { sequelize } = require('./Connect')
const { DataTypes } = require('sequelize')

const UserModel = sequelize.define(
    'User',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDel: {
            type: DataTypes.ENUM('0', '1'),
            defaultValue: '0',
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: true,
        tableName: 'users',
    }
)

module.exports = UserModel
