import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from 'src/user/schemas/user.schema';

export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>
		){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
			ignoreExpiration: true,
			secretKey: configService.get('JWT_SECRET'),
		});
	}

	async validate({_id}: Pick<User, '_id'>):Promise<User>{
		return this.userModel.findById({_id}).exec();
	}
}