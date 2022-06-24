import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) { }
	async userId(request: Request): Promise<number> {
		
		const cookie = request.cookies['jwt'];
		
		const data = await this.jwtService.verifyAsync(cookie);
		
		return data['_id'];
	}
	// async validateUser(email: string, pass: string): Promise<any> {
	// 	const user = await this.userService.getOne(email);
	// 	if (user && user.password === pass) {
	// 		const { password, ...result } = user;
	// 		return result;
	// 	}
	// 	return null;
	// }

	async issueTokenPair(userId: string){
		const data = {_id: userId};
		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d'
		});
		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1h'
		});

		return {refreshToken, accessToken};
	}

	returnUserFields(user: User){
		return {
			_id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		}
	}

}
