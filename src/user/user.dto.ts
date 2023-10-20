import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string
}
