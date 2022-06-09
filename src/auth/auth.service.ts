import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import RegisterUserDto from './dto/register.user.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {

	constructor(
		private readonly jwtService: JwtService,
	) { }
	async userId(request: Request): Promise<number> {
		
		const cookie = request.cookies['jwt'];
		
		const data = await this.jwtService.verifyAsync(cookie);
		
		return data['_id'];
	}
}
