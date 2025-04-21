/**
 * Enum representing the different dialog types or purposes within the application.
 *
 * Used to control which modal or tool is opened via the LauncherService.
 */
export enum DialogPurpose {
  /** Application information or about page. */
  ABOUT,

  /** Personal "About Me" profile or bio dialog. */
  ABOUT_ME,

  /** Delete confirmation dialog for a note. */
  DELETE_NOTE,

  /** Delete confirmation dialog for a todo item. */
  DELETE_TODO,

  /** Educational history and background dialog. */
  EDUCATION,

  /** Dialog for editing an existing note. */
  EDIT_NOTE,

  /** Dialog for editing an existing todo. */
  EDIT_TODO,

  /** Help dialog. */
  HELP,

  /** Dialog for creating a new note. */
  NEW_NOTE,

  /** Dialog for creating a new todo item. */
  NEW_TODO,

  /** Central notes dashboard or viewer. */
  NOTES,

  /** Project portfolio dialog. */
  PROJECTS,

  /** Multi-provider search dialog. */
  SEARCH,

  /** Application-wide settings dialog. */
  SETTINGS,

  /** Skills overview, visual charts, or résumé builder dialog. */
  SKILLS,

  /** STL file viewer for 3D models. */
  STLVIEWER,

  /** Countdown timer dialog. */
  TIMER,

  /** Todo management and task tracking dialog. */
  TODOS,

  /** Dialog for uploading new STL files. */
  UPLOAD_STL,

  /** Weather forecast widget or extended view dialog. */
  WEATHER,
}
