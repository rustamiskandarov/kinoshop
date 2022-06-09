//require('dotenv').config({ path: `../local.env` });
//require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: 'http://localhost:3001',
		credentials: true
	});
	await app.listen(process.env.NEST_SERVER_PORT || 3000);
}
bootstrap();
