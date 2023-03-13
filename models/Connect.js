const { Sequelize } = require('sequelize')
const moment = require('moment')

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        timezone: '+08:00',
        dialectOptions: {
            charset: 'utf8mb4'
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: (str) => {
            const now = moment(Date.now()).format('yyyy-MM-DD HH:mm:ss')
            str = str.replace('Executing (default)', '')
            console.info('\x1B[33m%s\x1B[37m%s\x1B[32m%s', '[sql] ', `(${now})`, str)
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('\x1B[36m%s\x1B[0m', '数据库连接成功.')
    })
    .catch((err) => {
        throw new Error('数据库连接失败' + err.message)
    })

sequelize.sync().then(() => {
    console.log('\x1B[36m%s\x1B[0m', '所有模型均已成功同步.')
})

module.exports = { sequelize }