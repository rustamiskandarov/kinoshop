import { IsEmail, IsNotEmpty } from "class-validator";

export  class CreateUserDto{

	readonly first_name;

	readonly last_name;

	@IsNotEmpty()
	@IsEmail()
	readonly email;
	
	@IsNotEmpty()
	readonly password;
}