import { createEvent, createStore } from "effector";

export const setIsDrawerOpen = createEvent<boolean>();

export const $isDrawerOpen = createStore(false).on(setIsDrawerOpen, (_, val) => val);
