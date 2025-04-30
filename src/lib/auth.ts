import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)

  return isValid ? user : null
}