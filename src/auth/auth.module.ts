import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CommonModule } from 'src/common/common.module';
import { Profile } from 'src/profile/schemas/profile.schema';
import { ProfileService } from 'src/profile/profile.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from 'src/config/jwt.config';

@Module({
	imports: [
		CommonModule,
		MongooseModule.forFeature([{ name: User.name, schema: User }]),
		MongooseModule.forFeature([{ name: Profile.name, schema: Profile }]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		})
	],
	providers: [UserService, AuthService, ProfileService],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule { }
