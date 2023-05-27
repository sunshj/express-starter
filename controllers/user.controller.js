const { prisma } = require('@/prisma')

async function findAllUserByPage(req, res) {
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
            AND: {
                isDel: false,
            },
        },
        orderBy: {
            userId: 'desc',
        },
        take: size,
        skip: (page - 1) * size,
    })
    const total = await userTotalCount(query)
    res.sendSuccess({ result, total })
}

async function userTotalCount(query) {
    if (query) {
        return prisma.user.count({
            where: {
                userName: {
                    contains: query,
                },
                AND: {
                    isDel: false,
                },
            },
        })
    }
    return prisma.user.count({ where: { isDel: false } })
}

async function findUserById(req, res) {
    try {
        const { uid: userId } = req.params
        const user = await prisma.user
            .findUnique({ where: { userId } })
            .catch((err) => res.sendFailed(err.message))
        if (!user) return res.sendFailed('用户不存在')
        res.sendSuccess(user)
    } catch (e) {
        res.sendFailed(e.message)
    }
}

module.exports = { findAllUserByPage, findUserById }
