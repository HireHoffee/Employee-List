import { createEvent, createStore } from "effector";

export const setIsDrawerOpen = createEvent<boolean>();
export const setSortValue = createEvent<"alphabet" | "birthday">();

export const $isDrawerOpen = createStore(false).on(setIsDrawerOpen, (_, val) => val);
export const $sortValue = createStore<"alphabet" | "birthday">("alphabet").on(
  setSortValue,
  (_, val) => val,
);
