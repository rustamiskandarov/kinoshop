
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Profile } from 'src/profile/schemas/profile.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

	_id: string;

	@Prop({ required: true , unique: true})
	email: string;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: Profile })
	profile: Profile;

	@Prop()
	first_name: string;

	@Prop()
	last_name: string;

	@Prop({default: true})
	isVerified: boolean;

	@Prop({ 
		type: String,
		required: true,
		select: false
	 })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
