export interface IAstroData {
  /** Time of sunrise in local time (e.g., "07:12 AM"). */
  sunrise?: string;

  /** Time of sunset in local time (e.g., "06:45 PM"). */
  sunset?: string;

  /** Time of moonrise in local time (e.g., "11:03 PM"). */
  moonrise?: string;

  /** Time of moonset in local time (e.g., "09:22 AM"). */
  moonset?: string;

  /** Current moon phase (e.g., "Waxing Gibbous"). */
  moon_phase?: string;

  /** Current moon illumination percentage (0–100). */
  moon_illumination?: number;

  /** Indicates if it is currently a full moon. */
  is_moon_up?: boolean;

  /** Indicates if the sun is currently above the horizon. */
  is_sun_up?: boolean;
}
