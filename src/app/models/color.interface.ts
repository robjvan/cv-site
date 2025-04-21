/** Describes a color record. */
export interface IColor {
  /**
   * Human-readable name of the color.
   * Example: "black".
   */
  name: string;

  /**
   * Color code in hex format (can include alpha channel).
   * Example: '0xff000000
   */
  code: string;
}
