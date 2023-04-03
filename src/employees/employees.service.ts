import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    // return 'This action adds a new employee';
    return this.prisma.employee.create({ data: createEmployeeDto });
  }

  findAll() {
    // return `This action returns all employees`;
    return this.prisma.employee.findMany({ where: { isDeleted: false } });
  }

  search(keyword: string) {
    return this.prisma.employee.findMany({
      where: {
        OR: [
          { firstName: { contains: keyword, mode: 'insensitive' } },
          { middleName: { contains: keyword, mode: 'insensitive' } },
          { lastName: { contains: keyword, mode: 'insensitive' } },
          { email: { contains: keyword, mode: 'insensitive' } },
          { department: { contains: keyword, mode: 'insensitive' } },
          { phone: { contains: keyword, mode: 'insensitive' } },
          { position: { contains: keyword, mode: 'insensitive' } },
        ],
      },
    });
  }

  findOne(id: number) {
    // return `This action returns a #${id} employee`;
    const employee = this.prisma.employee.findUnique({ where: { id } });

    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    // return `This action updates a #${id} employee`;
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    // return `This action removes a #${id} employee`;
    return this.prisma.employee.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
