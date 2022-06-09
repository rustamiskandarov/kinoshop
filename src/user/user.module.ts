import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';
import { Profile, ProfileSchema } from 'src/profile/schemas/profile.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [ProfileModule, CommonModule,
		MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UserController],
	providers: [UserService, ProfileService],
	exports: [UserService]
})
export class UserModule { }
