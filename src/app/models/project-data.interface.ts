/**
 * Represents a project entry used in portfolios, carousels, or feature sections.
 */
export interface IProjectData {
  /**
   * Title or name of the project.
   * Example: "AI-Powered Task Manager"
   */
  title: string;

  /**
   * Brief description outlining the purpose and functionality of the project.
   */
  description: string;

  /**
   * Technologies or tools used in the project.
   * Example: "Angular, NestJS, PostgreSQL"
   */
  stack: string;

  /**
   * Array of image paths or URLs used as visual thumbnails.
   * Can be used for carousels, previews, or galleries.
   */
  thumbnails: string[];

  /**
   * Optional external link to the project (e.g., GitHub, live demo, case study).
   */
  link?: string;
}
