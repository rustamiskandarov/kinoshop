
export class CreateProfileDto{
	
	brithDay?: Date;
	
	avatars?: string[];

	preferences?: string[];

	isVerified?: boolean;
	
	isActive?: boolean;

	subscibeStartDate?: Date;

	subscibeEndDate?: Date;
}