import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsStrongPassword({ minLength: 10, minSymbols: 1, minUppercase: 1 })
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

}
