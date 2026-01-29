import type { Employee } from "@/entities/employees/types";
import { $sortValue } from "@/shared/store/utils";
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

export const $sortedEmployees = combine($foundEmployees, $sortValue, (employees, sortValue) => {
  if (!employees) return [];

  if (sortValue === "alphabet") {
    return [
      ...[...employees].sort((a, b) =>
        a.firstName.localeCompare(b.firstName, undefined, { sensitivity: "base" }),
      ),
    ];
  }

  if (sortValue === "birthday") {
    const sorted = [
      ...[...employees].sort((a, b) => {
        const dateA = new Date(a.birthday);
        const dateB = new Date(b.birthday);
        const monthDayA = dateA.getMonth() * 100 + dateA.getDate();
        const monthDayB = dateB.getMonth() * 100 + dateB.getDate();
        return monthDayA - monthDayB;
      }),
    ];
    const nextYearBirthdays = sorted
      .filter((item) => {
        const today = new Date();
        const nextYearBirthday = new Date(
          today.getFullYear(),
          new Date(item.birthday).getMonth(),
          new Date(item.birthday).getDate(),
        );
        return nextYearBirthday < today;
      })
      .map((item, index) => (index === 0 ? { ...item, newYearBirthdaysStart: true } : item));

    return [...sorted.slice(nextYearBirthdays.length, sorted.length), ...nextYearBirthdays];
  }

  return employees;
});
