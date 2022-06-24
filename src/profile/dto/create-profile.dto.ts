import { Types } from "mongoose";

export class CreateProfileDto{
	
	readonly brithDay?: Date;
	
	readonly avatars?: string[];

	readonly preferences?: string[];

	readonly isVerified?: boolean;
	
	readonly isActive?: boolean;

	readonly subscibeStartDate?: Date;

	readonly subscibeEndDate?: Date;

}