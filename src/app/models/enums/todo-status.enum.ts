/**
 * Enumeration representing the various states a Todo item can be in.
 */
export enum TodoStatus {
  /** Task has been created but not yet started. */
  NEW,

  /** Task is currently in progress. */
  IN_PROGRESS,

  /** Task has been completed successfully. */
  COMPLETE,

  /** Task was intentionally canceled or abandoned. */
  CANCELLED,

  /** Task has been paused or deferred. */
  ON_HOLD,
}
