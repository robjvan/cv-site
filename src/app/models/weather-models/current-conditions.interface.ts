import { IAQIData } from './aqi-data.interface';
import { IWeatherConditions } from './weather-conditions.interface';

export interface ICurrentConditions {
  /** Real-time air quality data (if available based on plan). */
  air_quality: IAQIData;

  /** Current weather condition details (text, icon, etc.). */
  condition: IWeatherConditions;

  /** Feels-like temperature in Celsius. */
  feelslike_c: number;

  /** Feels-like temperature in Fahrenheit. */
  feelslike_f: number;

  /** Current relative humidity percentage. */
  humidity: number;

  /** Indicates if it is currently day (true) or night (false). */
  is_day: boolean;

  /** Last updated timestamp in local time (formatted as "YYYY-MM-DD HH:MM"). */
  last_updated: string;

  /** Last updated time as a Unix epoch (in seconds). */
  last_updated_epoch: number;

  /** Atmospheric pressure in inches of mercury. */
  pressure_in: number;

  /** Atmospheric pressure in millibars. */
  pressure_mb: number;

  /** Current temperature in Celsius. */
  temp_c: number;

  /** Current temperature in Fahrenheit. */
  temp_f: number;

  /** UV index at the current time. */
  uv: number;

  /** Wind direction in degrees (0–360). */
  wind_degree: number;

  /** Wind direction as a compass point (e.g., "NE", "SW"). */
  wind_dir: string;

  /** Wind speed in kilometers per hour. */
  wind_kph: number;

  /** Wind speed in miles per hour. */
  wind_mph: number;
}
