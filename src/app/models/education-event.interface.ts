/** Interface representing a single educational experience or academic achievement. */
export interface IEducationEvent {
  /**
   * Title or degree name associated with the event.
   * Example: "Bachelor of Science in Computer Science"
   */
  title?: string;

  /**
   * Date or date range of the educational event.
   * Format: "September 2015 - April 2019" or "2020"
   */
  date?: string;

  /**
   * Institution where the education occurred.
   * Example: "University of Toronto"
   */
  institution?: string;

  /**
   * Primary description of what was studied or achieved.
   * Required field for summary purposes.
   */
  description: string;

  /**
   * Additional comments, highlights, or recognitions.
   * Example: "Graduated with distinction, GPA: 3.9"
   */
  comments?: string;

  /**
   * Physical or virtual location of the institution.
   * Example: "Toronto, ON, Canada"
   */
  location?: string;
}
