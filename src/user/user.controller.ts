import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'User profile' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: 'User found successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUser(@Body() userDto: UserDto) {
    return this.userService.getUser(userDto)
  }
}
