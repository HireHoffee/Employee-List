import { createEvent, createStore } from "effector";

export const setIsDrawerOpen = createEvent<boolean>();
export const setSortValue = createEvent<"alphabet" | "birthday" | null>();

export const $isDrawerOpen = createStore(false).on(setIsDrawerOpen, (_, val) => val);
export const $sortValue = createStore<"alphabet" | "birthday" | null>(null).on(
  setSortValue,
  (_, val) => val,
);
