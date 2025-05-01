import { IAstroData } from './astro-data.interface';
import { IHourlyData } from './hourly-data.interface';
import { IWeatherDay } from './weather-day.interface';

export interface IForecastDay {
  /** Forecast date in YYYY-MM-DD format (local to the location). */
  date?: string;

  /** Forecast date as a Unix epoch timestamp (in seconds). */
  date_epoch?: number;

  /** Aggregate daily forecast data (e.g., temps, UV, precipitation). */
  day?: IWeatherDay; // Corresponds to "day" in WeatherAPI's forecast.day

  /** Astronomical data for the date (e.g., sunrise, moon phase). */
  astro?: IAstroData; // Corresponds to "astro" in WeatherAPI's forecast.astro

  /** Hourly forecast data for the date. */
  hour?: IHourlyData[]; // Corresponds to "hour" array in WeatherAPI's forecast.hour
}
