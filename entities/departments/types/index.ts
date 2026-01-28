import { DEPARTMENTS_LIST } from "@/shared/data";

export type ApiTag = (typeof DEPARTMENTS_LIST)[number]["apiTag"] | (string & {});
