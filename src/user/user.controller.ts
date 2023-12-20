import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login-dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto)
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<Object> {
        return this.userService.login(loginDto)
    }

    /*@Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.userService.findUserById(id);
    }*/

    @Post('/refresh-token')
    async refreshToken(@Body('refreshToken') refToken): Promise<Object> {
        return this.userService.refreshToken(refToken)
    }
}
