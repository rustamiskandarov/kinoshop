import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { ProfileService } from './profile.service';

@Module({
	imports: [CommonModule,
		MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	providers: [ProfileService],
	exports: [ProfileModule]
})
export class ProfileModule {}
