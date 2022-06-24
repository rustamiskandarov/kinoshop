import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (configService: ConfigService):Promise<MongooseModuleOptions> =>{
	return {
		uri: getMongoString(configService),
		...getMongoOptions()
	};
};


const getMongoString = (config: ConfigService) =>
	'mongodb://'+
	config.get('MONGO_USER')+
	':'+
	config.get('MONGO_PASSWORD')+
	'@'+
	config.get('MONGO_HOST')+
	':'+
	config.get('MONGO_PORT')+
	'/'+
	config.get('MONGO_DATABASE');




const getMongoOptions = () => ({
	useNewUrlParser: true,
	//useCreateIndex: true,
	useUnifiedTopology: true,
});