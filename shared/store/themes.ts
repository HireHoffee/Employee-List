import { createEvent, createStore } from "effector";

type Themes = "light" | "dark";

export const changeTheme = createEvent<Themes>();

export const $theme = createStore<Themes>("light").on(changeTheme, (_, theme) => theme);
