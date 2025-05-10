/**
 * Represents a user-created note with optional title and description.
 *
 * Typically used in note-taking or productivity components.
 */
export interface INote {
  /**
   * Unique identifier for the note.
   * Usually a UUID (e.g., "a1b2c3d4-5678-90ef-gh12-ijklmnopqrst")
   */
  id: string;

  /**
   * Optional title or headline for the note.
   * Example: "Meeting Summary"
   */
  title?: string;

  /**
   * Optional body content of the note.
   * Supports plain text or formatted string content.
   */
  description?: string;

  /**
   * ISO 8601 timestamp indicating when the note was created.
   * Example: "2025-04-18T15:24:00Z"
   */
  createdAt: string;

  /**
   * Whether the note is archived (hidden from active views).
   * Used for filtering or soft-deleting notes.
   */
  archived: boolean;
}
