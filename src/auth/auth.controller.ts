import { BadRequestException, Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import LoginUserDto from 'src/auth/dto/login.user.dto';
import RegisterUserDto from 'src/auth/dto/register.user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileService } from 'src/profile/profile.service';
import { User } from 'src/user/schemas/user.schema';

//@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly profileService: ProfileService,
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
		){}
		
	@UseGuards(AuthGuard)
	@Get('info')
	@HttpCode(200)
	async getPrivateOwnerInfo(@Req() req: Request){
		
		const id = await this.authService.userId(req);
		
		return this.userService.getOneWithPassword({id});

	}

	@Post('login')
	@HttpCode(200)
	async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) res: Response) {
		
		const {email, password} = body;
		const user = await this.userService.getOneWithPassword({email});
		
		if(!user || !this.isValidPassword(user, password)){
			throw new UnauthorizedException('Не верный логин или пароль');
		}

		if(!user.isVerified){
			throw new UnauthorizedException('Вашь акканту не активный, пройдите процедуру потверждения email');
		}

		const jwt = await this.jwtService.signAsync({ 
			_id: user._id, 
			first_name: user.first_name, 
			email: user.email });

		res.cookie('jwt', jwt, { httpOnly: true });

		return user;
	}
	@HttpCode(200)
	@Post('register')
	async register (@Body() dto: RegisterUserDto ){
		let { email, password } = dto;
		const user = await this.userService.getOne({ email });
		if (user) {
			throw new BadRequestException('email уже используеться');
		}
		password = await bcrypt.hash(dto.password, 12);
		
		const profile = await this.profileService.create({
			brithDay: null,
			avatars: [],
			preferences: [],
			isVerified: false,
			isActive: false,
			subscibeStartDate: null,
			subscibeEndDate: null,
		});
		const newUser = await this.userService.create({ ...dto, password });
		newUser.profile = profile;
		profile.save();
		newUser.save();
		return await this.userService.getOne({ email });
	}

	@Post('logout')
	async logout (@Res() res: Response){
		res.clearCookie('jwt');
		return res.status(200).send({message:'Logout success'});
	}


	private async isValidPassword(user: User, password: string): Promise<boolean>{
		return user.password === undefined || !await bcrypt.compare(password, user.password);
	}

}
