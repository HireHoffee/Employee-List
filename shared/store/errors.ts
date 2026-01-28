import { createEvent, createStore } from "effector";

export const setError = createEvent<any | null>();

export const $error = createStore(null).on(setError, (_, error) => error);
