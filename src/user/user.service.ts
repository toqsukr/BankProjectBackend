import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { isValidPhoneNumber } from 'src/auth/auth.helper'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(userDto: UserDto) {
    if (!isValidPhoneNumber(userDto.phone))
      throw new HttpException('Incorrect phone number format', HttpStatus.BAD_REQUEST)
    const userData = await this.prisma.user.findUnique({
      where: { phone: userDto.phone },
    })
    if (!userData) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    const { phone, name, surname, dateOfBirth, balance } = userData
    const dateOfBirthString = dateOfBirth.toDateString()
    return { name, surname, phone, dateOfBirth: dateOfBirthString, balance }
  }
}
