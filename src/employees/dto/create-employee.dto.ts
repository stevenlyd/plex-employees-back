import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty({ required: false })
  middleName?: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  department: string;

  @ApiProperty()
  directReports: number[];

  @ApiProperty()
  directSuperiors: number[];

  @ApiProperty({ required: false })
  isDeleted?: boolean = false;
}
