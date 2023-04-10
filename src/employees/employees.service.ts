import { Injectable, NotFoundException } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { config } from "src/util/config";
import { EmployeeResponse } from "src/util/interfaces";

import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({ data: createEmployeeDto });
  }

  async findAll(
    cursor?: string,
    limit = config.DEFAULT_LIMIT
  ): Promise<EmployeeResponse> {
    const parsedCursor = cursor ? parseInt(cursor) : undefined;

    const employees = await this.prisma.employee.findMany({
      where: { isDeleted: false },
      take: parseInt(limit),
      cursor: cursor ? { id: parseInt(cursor) } : undefined,
      orderBy: { id: "asc" },
    });

    let prevCursor = null;
    let nextCursor = null;

    if (parsedCursor && employees.length > 0) {
      const previousRecord = await this.prisma.employee.findFirst({
        where: { id: { lt: employees[0].id }, isDeleted: false },
        orderBy: { id: "desc" },
      });

      const nextRecord = await this.prisma.employee.findFirst({
        where: {
          id: { gt: employees[employees.length - 1].id },
          isDeleted: false,
        },
        orderBy: { id: "asc" },
      });

      nextCursor = nextRecord ? nextRecord.id : null;
      prevCursor = previousRecord ? previousRecord.id : null;
    } else if (employees.length > 0) {
      const nextRecord = await this.prisma.employee.findFirst({
        where: {
          id: { gt: employees[employees.length - 1].id },
          isDeleted: false,
        },
        orderBy: { id: "asc" },
      });

      nextCursor = nextRecord ? nextRecord.id : null;
      prevCursor = null;
    } else {
      prevCursor = null;
      nextCursor = null;
    }

    return {
      data: employees,
      nextCursor,
      prevCursor,
    };
  }

  async search(
    keyword: string,
    cursor?: string,
    limit = config.DEFAULT_LIMIT
  ): Promise<EmployeeResponse> {
    const parsedCursor = cursor ? parseInt(cursor) : undefined;
    const take = parseInt(limit);

    const employees = await this.prisma.employee.findMany({
      where: {
        AND: [
          { isDeleted: false },
          {
            OR: [
              { firstName: { contains: keyword, mode: "insensitive" } },
              { lastName: { contains: keyword, mode: "insensitive" } },
              { email: { contains: keyword, mode: "insensitive" } },
              { department: { contains: keyword, mode: "insensitive" } },
              { phone: { contains: keyword, mode: "insensitive" } },
              { position: { contains: keyword, mode: "insensitive" } },
            ],
          },
        ],
      },
      take,
      cursor: parsedCursor ? { id: parsedCursor } : undefined,
      orderBy: { id: "asc" },
    });

    let prevCursor = null;
    let nextCursor = null;

    if (parsedCursor && employees.length > 0) {
      const previousRecord = await this.prisma.employee.findFirst({
        where: {
          AND: [
            {
              id: {
                lt: employees[0].id,
              },
            },
            { isDeleted: false },
            {
              OR: [
                { firstName: { contains: keyword, mode: "insensitive" } },
                { lastName: { contains: keyword, mode: "insensitive" } },
                { email: { contains: keyword, mode: "insensitive" } },
                { department: { contains: keyword, mode: "insensitive" } },
                { phone: { contains: keyword, mode: "insensitive" } },
                { position: { contains: keyword, mode: "insensitive" } },
              ],
            },
          ],
        },
        orderBy: { id: "desc" },
      });

      const nextRecord = await this.prisma.employee.findFirst({
        where: {
          AND: [
            {
              id: {
                gt: employees[employees.length - 1].id,
              },
            },
            { isDeleted: false },
            {
              OR: [
                { firstName: { contains: keyword, mode: "insensitive" } },
                { lastName: { contains: keyword, mode: "insensitive" } },
                { email: { contains: keyword, mode: "insensitive" } },
                { department: { contains: keyword, mode: "insensitive" } },
                { phone: { contains: keyword, mode: "insensitive" } },
                { position: { contains: keyword, mode: "insensitive" } },
              ],
            },
          ],
        },
        orderBy: { id: "asc" },
      });

      nextCursor = nextRecord ? nextRecord.id : null;
      prevCursor = previousRecord ? previousRecord.id : null;
    } else if (employees.length > 0) {
      const nextRecord = await this.prisma.employee.findFirst({
        where: {
          AND: [
            {
              id: {
                gt: employees[employees.length - 1].id,
              },
            },
            { isDeleted: false },
            {
              OR: [
                { firstName: { contains: keyword, mode: "insensitive" } },
                { lastName: { contains: keyword, mode: "insensitive" } },
                { email: { contains: keyword, mode: "insensitive" } },
                { department: { contains: keyword, mode: "insensitive" } },
                { phone: { contains: keyword, mode: "insensitive" } },
                { position: { contains: keyword, mode: "insensitive" } },
              ],
            },
          ],
        },
        orderBy: { id: "asc" },
      });

      nextCursor = nextRecord ? nextRecord.id : null;
      prevCursor = null;
    } else {
      nextCursor = null;
      prevCursor = null;
    }

    return {
      data: employees,
      nextCursor,
      prevCursor,
    };
  }

  findOne(id: number) {
    const employee = this.prisma.employee.findUnique({ where: { id } });

    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.prisma.employee.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
