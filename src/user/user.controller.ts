import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import {CreateUserDto} from './dto/create.user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { ProfileService } from 'src/profile/profile.service';

//@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly profileService: ProfileService
		
		) { }

	@Post('create')
	async create(@Body() dto: CreateUserDto): Promise<User> {
		const password = await bcrypt.hash(dto.password, 12); 
		const user = await this.userService.create({...dto, password});
		
		const profile = this.profileService.create({
			brithDay: null,

			avatars: [],

			preferences: [],

			isVerified: false,

			isActive: false,

			subscibeStartDate: null,

			subscibeEndDate: null,
		});
		user.profile.save(profile);
		await user.save();
		return user;
	}

	@Get('')
	getAll():Promise<User[]>{
		return this.userService.getAll();
	}

	@Get(':id')
	getOne(@Param('id') id: string):Promise<User>{
		return this.userService.getOne({ id });
	}

	@Delete(':id')
	deletetOne(@Res() res: Response, @Param('id') _id: string) {
		
		const user = this.userService.getOne({ _id });
		console.log(user)
		if(!user){throw new NotFoundException("Пользователь не найден")}
		try {
			const result = this.userService.deleteOne({_id});
			console.log(result)
		} catch (error) {
			throw new BadRequestException("Ошибка удаления")
		}
		
		return res.status(200).send({
			message: `Пользователь с id: ${_id} успешно удалён`
		})
	}
}
