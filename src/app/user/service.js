import md5 from 'md5'
import { exclude, prisma } from '#utils'

export const findAllByPage = eventHandler(async (req, res) => {
  try {
    const { page, size, query = '' } = req.query
    const result = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true
      },
      where: {
        username: { contains: query },
        isDel: false
      },
      orderBy: {
        id: 'desc'
      },
      take: Number(size),
      skip: (Number(page) - 1) * Number(size)
    })
    const total = await prisma.user.count({
      where: {
        isDel: false,
        username: { contains: query }
      }
    })
    res.$success({ result, total })
  } catch (error) {
    res.$failed(error.message)
  }
})

export const findById = eventHandler(async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) return res.$failed('用户不存在')
    res.$success(exclude(user, ['password', 'isDel']))
  } catch (error) {
    res.$failed(error.message)
  }
})

export const create = eventHandler(async (req, res) => {
  try {
    const { username, password, email } = req.body
    const existedUser = await prisma.user.findUnique({
      where: { username }
    })
    if (existedUser) return res.$failed('用户已存在')
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: md5(password)
      }
    })
    res.$success(exclude(user, ['password', 'isDel']))
  } catch (error) {
    res.$failed(error.message)
  }
})
