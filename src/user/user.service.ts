import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { USER_NOT_FOUND } from 'src/common/messages-consts';
import { ProfileDocument } from 'src/profile/schemas/profile.schema';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {

	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		@InjectModel(User.name) private profileModel: Model<ProfileDocument>,
		) { }

	async create(createUserDto: CreateUserDto) {
		const createdUser =  new this.userModel(createUserDto);
		return createdUser.save();
		//return this.userModel.create(createUserDto);
	}

	async getAll(paginationDto: PaginationQueryDto): Promise<User[]> {
		const { limit, offset } = paginationDto;
		const users = await this.userModel
			.find()
			.skip(offset)
			.limit(limit)
			.populate('profile');
			console.log(users);
		return users;
	}

	async getOne(condition): Promise<User> {
		const user = this.userModel.findOne(condition).exec();
		
		return user;
	}
	async deleteOne(condition){
		return this.userModel.findByIdAndDelete(condition).exec();
	}

	async getOneWithPassword(condition): Promise<User> {
		return this.userModel.findOne(condition).select('+password').exec();
	}

	public async update(
		userId: string,
		updateUserDto: UpdateUserDto,
	): Promise<User> {
		const existingUser = await this.userModel.findByIdAndUpdate(
			{ _id: userId },
			updateUserDto,
		);

		if (!existingUser) {
			throw new NotFoundException(userId+USER_NOT_FOUND);
		}

		return existingUser;
	}

}
