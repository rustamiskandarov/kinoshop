
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import mongoose, { Date, Document } from 'mongoose';
import { Profile } from 'src/profile/schemas/profile.schema';


export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User{
	@Transform(({ value }) => value.toString())
	_id: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({default: false})
	isAdmin: boolean;


	@Prop()
	first_name: string;

	@Prop()
	last_name: string;

	@Prop({ default: true })
	isVerified: boolean;

	// @Prop()
	// profileId: Types.ObjectId;

	@Prop({
		type: String,
		required: true,
	})
	@Exclude()
	password: string;

	// @Prop({ type: ProfileSchema })
	// @Type(() => Profile)
	// profile: Profile;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
	profile: Profile;

	@Prop({ type: Date, default: Date.now })
	regisrationDate: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
