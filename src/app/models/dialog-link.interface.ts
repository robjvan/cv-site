export interface IDialogLink {
  /** Tooltop to be shown above the button. */
  tooltip: string;

  /** Action to be fired by clicking the button. */
  action: Function;

  /** List of classes to apply to the button. */
  class: string;

  openCheck: boolean;
}
