
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserStatusDocument = UserStatus & Document;

@Schema()
export class UserStatus {
	@Prop()
	name: string;

	@Prop()
	description: string;

	@Prop()
	password: string;
}

export const UserStatusSchema = SchemaFactory.createForClass(UserStatus);
