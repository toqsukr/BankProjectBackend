import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { isValidPhoneNumber } from 'src/auth/auth.helper'
import { PrismaService } from 'src/prisma.service'
import { CardDto, ContactDto, UserDto, UserImageDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserContacts(phone: string) {
    return this.prisma.user.findUnique({
      where: { phone: phone },
      include: {
        contacts: {
          select: {
            contact: {
              select: {
                name: true,
                surname: true,
                image: true,
              },
            },
          },
        },
      },
    })
  }

  async getUserCards(phone: string) {
    return this.prisma.user.findUnique({
      where: { phone: phone },
      include: {
        cards: {
          select: {
            cardNumber: true,
            expires: true,
            code: true,
          },
        },
      },
    })
  }

  async getUser(userDto: UserDto) {
    if (!isValidPhoneNumber(userDto.phone))
      throw new HttpException('Incorrect phone number format', HttpStatus.BAD_REQUEST)
    const userData = await this.prisma.user.findUnique({
      where: { phone: userDto.phone },
    })
    if (!userData) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    const { phone, name, surname, dateOfBirth, balance, image } = userData
    const dateOfBirthString = dateOfBirth.toDateString()
    return { name, surname, phone, dateOfBirth: dateOfBirthString, balance, image }
  }

  async setUserImage(userImageDto: UserImageDto) {
    if (!isValidPhoneNumber(userImageDto.phone))
      throw new HttpException('Incorrect phone number format', HttpStatus.BAD_REQUEST)
    const userData = await this.prisma.user.findUnique({
      where: { phone: userImageDto.phone },
    })
    if (!userData) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    const updatedUser = await this.prisma.user.update({
      where: { phone: userData.phone },
      data: {
        image: userImageDto.image,
      },
    })
    return { user: updatedUser }
  }

  async getCards(userDto: UserDto) {
    if (!isValidPhoneNumber(userDto.phone))
      throw new HttpException('Incorrect phone number format', HttpStatus.BAD_REQUEST)
    const userData = await this.getUserCards(userDto.phone)
    if (!userData) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return JSON.stringify(userData.cards)
  }

  async appendCard(cardDto: CardDto) {
    if (!isValidPhoneNumber(cardDto.userPhone))
      throw new HttpException('Incorrect phone number format', HttpStatus.BAD_REQUEST)
    const userData = await this.prisma.user.findUnique({
      where: { phone: cardDto.userPhone },
    })
    if (!userData) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    try {
      const { cardNumber, expires, code, userPhone } = cardDto
      await this.prisma.card.create({
        data: {
          cardNumber,
          expires,
          code,
          userPhone,
        },
      })
      const userData = await this.getUserCards(userPhone)
      return JSON.stringify(userData.cards)
    } catch (error) {
      console.error(error)
      throw new HttpException('Iternal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getContacts(userDto: UserDto) {
    if (!isValidPhoneNumber(userDto.phone))
      throw new HttpException('Incorrect phone number format', HttpStatus.BAD_REQUEST)
    const userData = await this.getUserContacts(userDto.phone)
    if (!userData) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return JSON.stringify(userData.contacts)
  }

  async appendContact(contactDto: ContactDto) {
    if (!isValidPhoneNumber(contactDto.phone))
      throw new HttpException('Incorrect phone number format', HttpStatus.BAD_REQUEST)

    if (!isValidPhoneNumber(contactDto.userPhone))
      throw new HttpException('Incorrect user phone number format', HttpStatus.BAD_REQUEST)

    const userData = await this.prisma.user.findUnique({
      where: { phone: contactDto.userPhone },
    })
    if (!userData) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    try {
      const { name, surname, image, phone, userPhone } = contactDto
      await this.prisma.contact.create({
        data: {
          name,
          surname,
          image,
          phone,
          userPhone,
        },
      })
      const userData = await this.getUserContacts(userPhone)
      return JSON.stringify(userData.contacts)
    } catch (error) {
      console.error(error)
      throw new HttpException('Iternal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
