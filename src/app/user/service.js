import md5 from 'md5'
import { defineEventHandler } from 'express-filebased-routing'
import { exclude, prisma } from '../../utils/prisma.js'

export const findAllByPage = defineEventHandler(async (req, res) => {
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
    res.sendSuccess({ result, total })
  } catch (error) {
    res.sendFailed(error.message)
  }
})

export const findById = defineEventHandler(async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) return res.sendFailed('用户不存在')
    res.sendSuccess(exclude(user, ['password', 'isDel']))
  } catch (error) {
    res.sendFailed(error.message)
  }
})

export const create = defineEventHandler(async (req, res) => {
  try {
    const { username, password, email } = req.body
    const existedUser = await prisma.user.findUnique({
      where: { username }
    })
    if (existedUser) return res.sendFailed('用户已存在')
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: md5(password)
      }
    })
    res.sendSuccess(exclude(user, ['password', 'isDel']))
  } catch (error) {
    res.sendFailed(error.message)
  }
})
