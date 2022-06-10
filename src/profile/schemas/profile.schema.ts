
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {

	_id: string;

	// @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	// user: User;

	// @Prop()
	// favorites: Movie;

	@Prop({type: Date})
	brithDay: Date;

	@Prop()
	avatars: string[];

	@Prop()
	preferences: string[];

	@Prop({ default: true })
	isVerified: boolean;

	@Prop({ default: true})
	isActive: boolean;

	@Prop({ type: Date })
	subscibeStartDate: Date;
	
	@Prop({ type: Date })
	subscibeEndDate: Date;

	@Prop({ type: Date })
	createdAt: Date;

	@Prop({ type: Date })
	updatedAt: Date;
	
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
