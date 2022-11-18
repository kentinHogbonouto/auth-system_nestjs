import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  } from 'class-validator';

  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/[a-zA-Z0-9_-]{2,20}/, {
      message: 'Invalid firstname',
    })
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    @Matches(/[a-zA-Z0-9_-]{2,20}/, {
      message: 'Invalid lastname',
    })
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/[a-zA-Z0-9_-]{2,20}/, {
      message: 'Invalid username',
    })
    username: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(60)
    password: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }