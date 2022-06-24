import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { MovieModule } from './movie/movie.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './config/mongo.config';



@Module({
	imports: [
		//ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
		ConfigModule.forRoot({ envFilePath: `dev.env` }),
		
		// MongooseModule.forRoot(`mongodb://admin:admin@localhost:27017?retryWrites=true&w=majority`, { 
		// 	useNewUrlParser: true}
		// ),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		
		// MongooseModule.forRootAsync({
		// 	imports: [ConfigModule],
		// 	useFactory: async (configService: ConfigService) => ({
		// 		uri: configService.get<string>('MONGODB_URI'),
		// 	}),
		// 	inject: [ConfigService],
		// }),
		
		UserModule, ProfileModule, OrderModule, OrderItemModule, MovieModule, CommonModule, AuthModule],
	
	controllers: [],
	providers: [],
})
export class AppModule { }

