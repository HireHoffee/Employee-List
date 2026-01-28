import type { Employee } from "@/entities/employees/types";
import { combine, createEvent, createStore } from "effector";

export const setEmployees = createEvent<Employee[]>();
export const setEmployeeSelectedId = createEvent<string | null>();

export const $employees = createStore<Employee[] | null>(null).on(setEmployees, (_, data) => data);
export const $selectedEmployeeId = createStore<string | null>(null).on(
  setEmployeeSelectedId,
  (_, id) => id,
);

export const $employee = combine(
  $employees,
  $selectedEmployeeId,
  (employees, id) => employees?.find((emp) => emp.id === id) ?? null,
);
