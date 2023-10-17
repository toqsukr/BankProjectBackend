import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  surname: string

  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date

  @IsString()
  @IsNotEmpty()
  phone: string
}
