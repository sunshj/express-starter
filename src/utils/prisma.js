import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

/**
 * @template T
 * @param {T} data
 * @param {(keyof T)[]} keys
 */
export function exclude(data, keys) {
  return Object.fromEntries(Object.entries(data).filter(([key]) => !keys.includes(key)))
}
