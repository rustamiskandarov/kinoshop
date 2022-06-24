import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getJWTConfig = async (configService: ConfigService):Promise<JwtModuleOptions> =>{
	return {
		
	};
};
