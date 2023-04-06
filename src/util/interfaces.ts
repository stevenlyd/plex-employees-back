import { Employee } from "@prisma/client";

export interface EmployeeResponse {
  data: Employee[];
  nextCursor?: string;
  prevCursor?: string;
}
