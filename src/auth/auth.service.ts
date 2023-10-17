import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { LoginDto, RegisterDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(prisma: PrismaService) {}

  login(loginDto: LoginDto) {
    return 'This action adds a new auth'
  }

  register(registerDto: RegisterDto) {
    return 'This action adds a new auth'
  }

  getAll() {
    return `This action returns all auth`
  }

  getByID(id: number) {
    return `This action returns a #${id} auth`
  }
}
