const User = require('../models/UserModel')
const { Op } = require('sequelize')

async function findAllUserByPage(req, res) {
    const { page, size, query = '' } = req.query
    const result = await User.findAll({
        where: {
            [Op.and]: {
                userName: { [Op.like]: `%${query}%` },
                isDel: '0'
            }
        },
        order: [['userId', 'DESC']],
        limit: size,
        offset: (page - 1) * size
    })
    const total = await userTotalCount(query)
    res.sendSuccess({ result, total })
}

async function userTotalCount(query) {
    if (query) {
        return await User.count({
            where: {
                [Op.and]: {
                    userName: { [Op.like]: `%${query}%` },
                    isDel: '0'
                }
            }
        })
    }
    return await User.count({ where: { isDel: '0' } })
}

async function findUserById(req, res) {
    const { uid } = req.params
    const user = await User.findByPk(uid).catch(err => res.sendFailed(err.message))
    if (!user) return res.sendFailed('用户不存在')
    res.sendSuccess(user)
}

module.exports = { findAllUserByPage, findUserById }