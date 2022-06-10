import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {

	constructor(
		@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
	){

	}
	async create(createProfileDto: CreateProfileDto){
		return this.profileModel.create(
			{
				...createProfileDto,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			}
		);
		
	}
}
