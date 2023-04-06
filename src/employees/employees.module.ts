import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";

import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [PrismaModule],
})
export class EmployeesModule {}
