const { prisma } = require('../../prisma')
const md5 = require('md5')

async function findAllUserByPage(req, res) {
    try {
        const { page, size, query = '' } = req.query
        const result = await prisma.user.findMany({
            select: {
                userId: true,
                userName: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                userName: {
                    contains: query,
                },
                isDel: false,
            },
            orderBy: {
                userId: 'desc',
            },
            take: Number(size),
            skip: (Number(page) - 1) * Number(size),
        })
        const total = await prisma.user.count({
            where: {
                isDel: false,
                userName: {
                    contains: query,
                },
            },
        })
        res.sendSuccess({ result, total })
    } catch (e) {
        res.sendFailed(e.message)
    }
}

async function findUserById(req, res) {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({ where: { userId: Number(id) } })
        if (!user) return res.sendFailed('用户不存在')
        res.sendSuccess(user)
    } catch (e) {
        res.sendFailed(e.message)
    }
}

async function create(req, res) {
    try {
        const { userName, password } = req.body
        const users = await prisma.user.findMany({
            where: { userName },
        })
        if (users.length) return res.sendFailed('用户已存在')
        const user = await prisma.user.create({
            data: {
                userName,
                password: md5(password),
            },
            select: {
                userId: true,
                userName: true,
                createdAt: true,
                updatedAt: true,
            },
        })
        res.sendSuccess(user)
    } catch (e) {
        res.sendFailed(e.message)
    }
}

module.exports = { findAllUserByPage, findUserById, create }
