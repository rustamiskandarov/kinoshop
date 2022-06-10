import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export default  class LoginUserDto{
	@Length(1, 100)
	@IsEmail()
	readonly email;
	@IsNotEmpty()
	@Length(5, 20)
	readonly password;
}