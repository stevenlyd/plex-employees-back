import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
  IsBoolean,
  IsEnum,
} from 'class-validator';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsString()
  department: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  directSupervisors: number[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  directReports: number[];

  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;
}
