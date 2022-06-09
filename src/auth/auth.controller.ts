import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import LoginUserDto from './dto/login.user.dto';
import RegisterUserDto from './dto/register.user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

//@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
		){}
		
	@UseGuards(AuthGuard)
	@Get('info')
	async getPrivateOwnerInfo(@Req() req: Request){
		
		const id = await this.authService.userId(req);
		
		return await this.userService.getOneWithPassword({id});

	}

	@Post('login')
	async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) res: Response) {
		
		const {email, password} = body;
		const user = await this.userService.getOneWithPassword({email})
		
		if(!user){
			throw new UnauthorizedException("Не верный логин или пароль")
		}

		if (user.password===undefined || !await bcrypt.compare(password, user.password)){
			throw new UnauthorizedException("Не верный логин или пароль")
		}
		if(!user.isVerified){
			throw new UnauthorizedException("Вашь акканту не активный, пройдите процедуру потверждения email")
		}

		const jwt = await this.jwtService.signAsync({ 
			_id: user._id, 
			first_name: user.first_name, 
			email: user.email });

		res.cookie('jwt', jwt, { httpOnly: true })

		return user;
	}

	@Post('register')
	async register (@Body() dto: RegisterUserDto ){
		let { email, password } = dto;
		const user = await this.userService.getOne({ email })
		if (user) {
			throw new BadRequestException('email уже используеться')
		}
		password = await bcrypt.hash(dto.password, 12);
		return this.userService.create({ ...dto, password });
	}

	@Post('logout')
	async logout (@Res() res: Response){
		res.clearCookie('jwt');
		return res.status(200).send({message:'Logout success'})
	}



}
