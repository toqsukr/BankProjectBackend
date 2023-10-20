import { Body, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'User profile' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUser(@Body() userDto: UserDto) {
    return this.userService.getUser(userDto)
  }
}
