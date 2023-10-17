import { Body, Controller, Post } from '@nestjs/common'
import { LoginDto, RegisterDto } from './auth.dto'
import { isValidBirthDate, isValidEmail, isValidPhoneNumber } from './auth.helper'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    if (!isValidBirthDate(registerDto.dateOfBirth)) return 'Неправильный формат даты рождения'
    if (!isValidEmail(registerDto.email)) return 'Неправльный формат email'
    if (!isValidPhoneNumber(registerDto.phone)) return 'Неправильный формат номера телефона'
    return this.authService.register(registerDto)
  }
}
