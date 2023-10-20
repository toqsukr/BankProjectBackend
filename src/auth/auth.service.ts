import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { PrismaService } from 'src/prisma.service'
import { LoginDto, RegisterDto } from './auth.dto'
import { isValidBirthDate, isValidPhoneNumber } from './auth.helper'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly saltRounds = 10

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

  async login(loginDto: LoginDto) {
    if (!isValidPhoneNumber(loginDto.phone))
      throw new HttpException('Incorrect phone number format', HttpStatus.BAD_REQUEST)

    const userData = await this.prisma.user.findUnique({
      where: { phone: loginDto.phone },
    })
    if (!userData) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    const compareResult = await compare(loginDto.password, userData.password)
    if (!compareResult)
      throw new HttpException('Incorrect email or password', HttpStatus.UNAUTHORIZED)
    const accessToken = this.createAccessToken(loginDto)
    const { name, surname, phone, dateOfBirth, balance } = userData
    const user = { name, surname, phone, dateOfBirth, balance }
    return { user, accessToken }
  }

  async register(registerDto: RegisterDto) {
    if (!isValidBirthDate(registerDto.dateOfBirth))
      throw new HttpException('Incorrect date format', HttpStatus.BAD_REQUEST)
    if (!isValidPhoneNumber(registerDto.phone))
      throw new HttpException('Incorrect phone number format', HttpStatus.BAD_REQUEST)

    try {
      const { password, dateOfBirth: dateOfBirthString, ...userData } = registerDto
      const accessToken = this.createAccessToken({ phone: userData.phone, password })
      const [day, month, year] = dateOfBirthString.split('.').map(Number)
      const dateOfBirth = new Date(year, month - 1, day)
      const hashedPassword = await hash(password, this.saltRounds)
      const user = {
        balance: new Decimal(0),
        dateOfBirth,
        ...userData,
      }
      await this.createUser({
        password: hashedPassword,
        ...user,
      })
      return { user, accessToken }
    } catch (error) {
      console.error(error)
      throw new HttpException('Iternal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
