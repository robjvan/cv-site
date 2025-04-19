export interface IWeatherLocation {
  /** Optional name of the location (e.g., city or town). */
  name?: string;

  /** Optional administrative region or state the location belongs to. */
  region?: string;

  /** Optional country of the location. */
  country?: string;

  /** Optional time zone ID (e.g., "America/St_Johns"). */
  tz_id?: string;

  /** Optional local time at the location in ISO 8601 string format. */
  localtime?: string;

  /** Optional latitude of the location in decimal degrees. */
  lat?: number;

  /** Optional longitude of the location in decimal degrees. */
  lon?: number;

  /** Optional local time at the location as a Unix epoch timestamp (in seconds). */
  localtime_epoch?: number;
}
