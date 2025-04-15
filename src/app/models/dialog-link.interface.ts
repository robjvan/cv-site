export interface IDialogLink {
  /** Tooltip text displayed when hovering over the button. */
  tooltip: string;

  /** Callback function to be executed when the button is clicked. */
  action: Function;

  /** CSS class names to apply to the button element. */
  class: string;

  /** Indicates whether the associated dialog is currently open. */
  openCheck: boolean;
}
