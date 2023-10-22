import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CardDto, ContactDto, UserDto, UserImageDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('user')
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

  @Put()
  @HttpCode(200)
  @ApiOperation({ summary: 'Set user image' })
  @ApiBody({ type: UserImageDto })
  @ApiResponse({ status: 200, description: 'User image updated' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  setUserImage(@Body() userImageDto: UserImageDto) {
    return this.userService.setUserImage(userImageDto)
  }

  @Post('cards')
  @HttpCode(201)
  @ApiOperation({ summary: 'User cards' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: 'Cards successfully returned' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getCards(@Body() userDto: UserDto) {
    return this.userService.getCards(userDto)
  }

  @Post('cards/add')
  @HttpCode(201)
  @ApiOperation({ summary: 'Append card' })
  @ApiBody({ type: CardDto })
  @ApiResponse({ status: 201, description: 'Card successfully appended' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  appendCard(@Body() cardDto: CardDto) {
    return this.userService.appendCard(cardDto)
  }

  @Post('contacts')
  @HttpCode(201)
  @ApiOperation({ summary: 'User contacts' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: 'Contacts successfully returned' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getContacts(@Body() userDto: UserDto) {
    return this.userService.getContacts(userDto)
  }

  @Post('contacts/add')
  @HttpCode(201)
  @ApiOperation({ summary: 'Append contact' })
  @ApiBody({ type: ContactDto })
  @ApiResponse({ status: 201, description: 'Contact successfully appended' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  appendContact(@Body() contactDto: ContactDto) {
    return this.userService.appendContact(contactDto)
  }
}
