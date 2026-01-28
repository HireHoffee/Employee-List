import { createEvent, createStore } from "effector";
import type { ApiTag } from "../types";

export const setSelectedDepartment = createEvent<ApiTag>();

export const $selectedDepartment = createStore<ApiTag>("all").on(
  setSelectedDepartment,
  (_, tag) => tag,
);
