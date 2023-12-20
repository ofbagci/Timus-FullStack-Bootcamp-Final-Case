import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        let user = this.userRepo.create(dto)
        return await this.userRepo.save(user)
    }

    async login(loginDto: LoginDto): Promise<Object> {
        const { email, password } = loginDto

        const user = await this.userRepo.findOneBy({ email })

        if (!user) {
            throw new UnauthorizedException({ msg: 'No user found' });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new UnauthorizedException({ msg: 'Please check your email and password' });
        }

        return this.generateTokens(user.id)
    }

    async findUserById(id: number): Promise<User | null> {
        return await this.userRepo.findOne({ where: { id } })
    }

    async refreshToken(refToken: string): Promise<Object> {
        const decoded = jwt.decode(refToken)
        const userId = decoded.user_id

        return this.generateTokens(userId)
    }

    generateTokens(userId: any): any {
        const accToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            user_id: userId,
        }, 'final-project-secret-key')

        const refToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (120 * 60),
            user_id: userId,
        }, 'final-project-secret-key')

        return { accessToken: accToken, refreshToken: refToken }
    }
}
