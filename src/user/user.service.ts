import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileService } from 'src/profile/profile.service';
import { CreateUserDto } from './dto/create.user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {

	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		) { }

	async create(createUserDto: CreateUserDto): Promise<User> {
		// const createdUser =  new this.userModel(createUserDto);
		// return createdUser.save();
		return await this.userModel.create(createUserDto);
	}

	async getAll(): Promise<User[]> {
		return await this.userModel.find().exec();
	}

	async getOne(condition): Promise<User> {
		return await this.userModel.findOne(condition).exec();
	}
	async deleteOne(condition){
		return await this.userModel.findByIdAndDelete(condition).exec();
	}

	async getOneWithPassword(condition): Promise<User> {
		return await this.userModel.findOne(condition).select('+password').exec();
	}

	async updateOne() { }

}
