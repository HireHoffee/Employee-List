import type { Employee } from "@/entities/employees/types";
import { combine, createEvent, createStore } from "effector";

export const setEmployees = createEvent<Employee[]>();
export const setEmployeeSelectedId = createEvent<string | null>();
export const setSearchedText = createEvent<string | "">();

export const $employees = createStore<Employee[] | null>(null).on(setEmployees, (_, data) => data);
export const $selectedEmployeeId = createStore<string | null>(null).on(
  setEmployeeSelectedId,
  (_, id) => id,
);
export const $searchedText = createStore<string | "">("").on(setSearchedText, (_, text) => text);

export const $employee = combine(
  $employees,
  $selectedEmployeeId,
  (employees, id) => employees?.find((emp) => emp.id === id) ?? null,
);

export const $foundEmployees = combine($employees, $searchedText, (employees, text) => {
  if (!text.trim()) return employees ?? [];

  const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedText, "i");
  return (
    employees?.filter(
      (emp) => regex.test(emp.firstName) || regex.test(emp.lastName) || regex.test(emp.userTag),
    ) ?? []
  );
});
