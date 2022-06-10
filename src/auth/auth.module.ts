import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CommonModule } from 'src/common/common.module';

@Module({
	imports: [CommonModule,
		MongooseModule.forFeature([{ name: User.name, schema: User }]),
	],
	providers: [UserService, AuthService],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule { }
