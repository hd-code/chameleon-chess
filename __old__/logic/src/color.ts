import { isEnum } from "./type-guards";

/**
 * An enum which represents the four main colors that are the core of the whole
 * game. They are used for the fields on the game board, to represent players
 * and more.
 * - `red`:    0
 * - `green`:  1
 * - `yellow`: 2
 * - `blue`:   3
 */
export enum Color {
  red,
  green,
  yellow,
  blue,
}

/** TypeGuard for `Color` */
export function isColor(color: unknown): color is Color {
  return isEnum(color, Color);
}
