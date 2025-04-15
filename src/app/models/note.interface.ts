export interface INote {
  /** Unique identifier for the note. */
  id: string;

  /** Optional title or heading of the note. */
  title?: string;

  /** Optional main content or body text of the note. */
  description?: string;

  /** Timestamp representing when the note was created. */
  createdAt: string;

  /** Indicates whether the note has been archived. */
  archived: boolean;
}
