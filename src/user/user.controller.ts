import { BadRequestException, Body, Controller, Delete, Res, Get, NotFoundException, Param, Post, Put, HttpStatus, UseInterceptors } from '@nestjs/common';
import {CreateUserDto} from './dto/create.user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/schemas/profile.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { 
	USER_HAS_BEEN_SUCCESSFULLY_UPDATED,
	ERROR_USER_UPDATED,
	USER_NOT_FOUND
} from 'src/common/messages-consts';
import MongooseClassSerializerInterceptor from 'src/common/mongooseClassSerializer.interceptor';
import { Types } from 'mongoose';

@UseInterceptors(MongooseClassSerializerInterceptor(User))
@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly profileService: ProfileService
		
		) { }

	@Post('create')
	public async create(@Body() dto: CreateUserDto): Promise<User> {
		const password = await bcrypt.hash(dto.password, 12); 
		const user = await this.userService.create({...dto, password});
		
		const profile = await this.profileService.create({
			brithDay: null,
			userId: user._id,
			avatars: [],
			preferences: [],
			isVerified: false,
			isActive: false,
			subscibeStartDate: null,
			subscibeEndDate: null,
		});

		user.profile = profile;
		await user.save();
		return user;
	}

	@Get('')
	public async getAll(@Body() paginationDto: PaginationQueryDto):Promise<User[]>{
		return this.userService.getAll(paginationDto);
	}

	
	@Get(':id')
	public async getOne(@Param('id') id: string):Promise<User>{
		return await this.userService.getOne({ id });
	}

	@Delete(':id')
	public deletetOne(@Res() res: Response, @Param('id') _id: string) {
		
		const user = this.userService.getOne({ _id });
		if(!user){throw new NotFoundException('Пользователь не найден');}
		try {
			this.userService.deleteOne({_id});
		} catch (error) {
			throw new BadRequestException('Ошибка удаления');
		}
		
		return res.status(200).send({
			message: `Пользователь с id: ${_id} успешно удалён`
		});
	}
	@Put(':id')
	public async update(
		@Res() res: Response,
		@Body() updateUserDto: UpdateUserDto, 
		@Param('id') userId: string){
			try {
				const user = await this.userService.update(
					userId,
					updateUserDto
				);
				if(!user){
					throw new NotFoundException(USER_NOT_FOUND);
				}
				return res.status(HttpStatus.OK).json({
					message: USER_HAS_BEEN_SUCCESSFULLY_UPDATED,
					user,
				});
			} catch(error){
				return res.status(HttpStatus.BAD_REQUEST).json({
					message: ERROR_USER_UPDATED,
					status: 400,
				});
			}
	}
}
