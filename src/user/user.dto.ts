import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string
}

export class CardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cardNumber: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  expires: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userPhone: string
}

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  surname: string

  @IsString()
  @ApiProperty()
  image: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userPhone: string
}
