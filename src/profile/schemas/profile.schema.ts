
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Date, Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
	@Transform(({ value }) => value.toString())
	_id: string;

	@Prop()
	userId: Types.ObjectId;

	// @Prop()
	// favorites: Movie;

	@Prop({ type: Date })
	brithDay: Date;

	@Prop({ type: () => [String] })
	avatars: string[];

	@Prop({ type: () => [String] })
	preferences: string[];

	@Prop({ default: true })
	isVerified: boolean;

	@Prop({ default: true })
	isActive: boolean;

	@Prop({ type: Date })
	subscibeStartDate: Date;

	@Prop({ type: Date })
	subscibeEndDate: Date;

	// @Prop({ type: Date, default: Date.now })
	// createdAt: Date;

	// @Prop({ type: Date, default: Date.now })
	// updatedAt: Date;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
