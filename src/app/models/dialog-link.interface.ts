/** Represents a clickable UI element in the dock or toolbar that opens a dialog or app. */
export interface IDialogLink {
  /**
   * Text shown in a tooltip when hovering over the icon/button.
   * Example: "Open Settings"
   */
  tooltip: string;

  /**
   * Callback function invoked when the user clicks the link.
   * This typically opens a dialog or performs navigation.
   */
  action: Function;

  /**
   * CSS class names used to style the icon or button.
   * Example: "bi bi-gear"
   */
  class: string;

  /**
   * Indicates whether the associated dialog or app is currently open.
   * Used for conditional styling (e.g., active state).
   */
  openCheck: boolean;
}
