import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string
}

export class UserImageDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  image: string
}

export class CardIDDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cardNumber: string
}

export class CardDto extends CardIDDto {
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

export class ContactDto extends UserDto {
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
