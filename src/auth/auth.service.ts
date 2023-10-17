import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { sign } from 'jsonwebtoken'
import { PrismaService } from 'src/prisma.service'
import { v4 as uuidv4 } from 'uuid'
import { LoginDto, RegisterDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: User): Promise<User> {
    return await this.prisma.user.create({ data })
  }

  createAccessToken(payload: LoginDto): string {
    const generateSecretKey = (length: number): string => {
      const crypto = require('crypto')
      const byteLength = length / 2
      const secretKey = crypto.randomBytes(byteLength)
      const secretKeyHex: string = secretKey.toString('hex')
      return secretKeyHex
    }
    const accessToken: string = sign(payload, generateSecretKey(32), {
      expiresIn: '1h',
    })
    return accessToken
  }

  login(loginDto: LoginDto) {
    return this.createAccessToken(loginDto)
  }

  register(registerDto: RegisterDto) {
    const id = uuidv4()
    const { password, dateOfBirth: dateOfBirthString, ...userData } = registerDto
    const accessToken = this.createAccessToken({ email: userData.email, password })
    const dateOfBirth = new Date(dateOfBirthString)
    this.createUser({
      id,
      balance: new Decimal(0),
      dateOfBirth,
      ...userData,
    })
    return { accessToken }
  }

  getAll() {
    return `This action returns all auth`
  }
}
