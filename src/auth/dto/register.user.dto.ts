import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export default  class RegisterUserDto{

	@MaxLength(250)
	readonly first_name;
	@MaxLength(250)
	readonly last_name;
	@Length(5, 250)
	@IsEmail()
	readonly email;
	@IsNotEmpty()
	@Length(5, 20)
	readonly password;
}