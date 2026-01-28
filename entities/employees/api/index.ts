import api from "@/shared/api/instance";
import type { EmployeesResponse } from "../types";

export const getEmployees = (department: string = "all") => {
  return api.get<EmployeesResponse>(`/users?__example=${department}`);
};
