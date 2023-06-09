import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { config } from "src/util/config";
import { EmployeeResponse } from "src/util/interfaces";

import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { EmployeesService } from "./employees.service";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(
    @Body()
    createEmployeeDto: CreateEmployeeDto
  ) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  async findAll(
    @Query("keyword")
    keyword: string,
    @Query("cursor")
    cursor?: string,
    @Query("limit")
    limit: string = config.DEFAULT_LIMIT
  ): Promise<EmployeeResponse> {
    if (keyword && keyword.length > 0) {
      return await this.employeesService.search(keyword, cursor, limit);
    } else {
      return await this.employeesService.findAll(cursor, limit);
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.employeesService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return await this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.employeesService.remove(+id);
  }
}
