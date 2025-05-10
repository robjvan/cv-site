import { IAQIData } from './aqi-data.interface';
import { IWeatherConditions } from './weather-conditions.interface';

export interface IHourlyData {
  /** Local time for the forecasted hour (formatted as "YYYY-MM-DD HH:MM"). */
  time?: string;

  /** Wind direction as a compass point (e.g., "NW", "ESE"). */
  wind_dir?: string;

  /** Temperature in Celsius. */
  temp_c?: number;

  /** Temperature in Fahrenheit. */
  temp_f?: number;

  /** Wind speed in miles per hour. */
  wind_mph?: number;

  /** Wind speed in kilometers per hour. */
  wind_kph?: number;

  /** Atmospheric pressure in millibars. */
  pressure_mb?: number;

  /** Atmospheric pressure in inches of mercury. */
  pressure_in?: number;

  /** Feels-like temperature in Celsius. */
  feelslike_c?: number;

  /** Feels-like temperature in Fahrenheit. */
  feelslike_f?: number;

  /** Whether it will rain during this hour. */
  will_it_rain?: boolean;

  /** Whether it will snow during this hour. */
  will_it_snow?: boolean;

  /** Wind direction in degrees (0–360). */
  wind_degree?: number;

  /** Local time for the forecasted hour as a Unix epoch (in seconds). */
  time_epoch?: number;

  /** Relative humidity percentage. */
  humidity?: number;

  /** Cloud cover percentage. */
  cloud?: number;

  /** Chance of rain during this hour (0–100). */
  chance_of_rain?: number;

  /** UV index level. */
  uv?: number;

  /** Air quality index data (if available and enabled in your WeatherAPI plan). */
  air_quality?: IAQIData;

  /** Weather condition details (text, icon, etc.). */
  condition?: IWeatherConditions;
}
