/** Describes a color record.
 *
 * @param {string} name - Name of the color.
 * @param {string} code - Hex code for the color.
 *
 * @example
 * const color: IColor = {
 *   name: 'black',
 *   code: '0xff000000',
 * }
 */
export interface IColor {
  /** Name of the color. */
  name: string;

  /** Hex code for the color. */
  code: string;
}
