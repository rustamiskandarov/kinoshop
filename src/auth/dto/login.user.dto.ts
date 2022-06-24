import { IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';
import { FIELD_MUST_BE_EMAIL_FORMAT, MUST_CONTAIN_MAX_CHARACTERS, MUST_CONTAIN_MIN_CHARACTERS } from 'src/common/messages-consts';

export default  class LoginUserDto{
	@MinLength(6, {
		message: MUST_CONTAIN_MIN_CHARACTERS(6)
	})
	@IsEmail({},{
		message: FIELD_MUST_BE_EMAIL_FORMAT
	})
	readonly email;

	@IsNotEmpty()
	@MinLength(6, {
		message: MUST_CONTAIN_MIN_CHARACTERS(6)
	})
	@MaxLength(15, {
		message: MUST_CONTAIN_MAX_CHARACTERS(15)
	})
	readonly password;
}