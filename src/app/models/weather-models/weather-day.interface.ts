import { IAQIData } from './aqi-data.interface';
import { IWeatherConditions } from './weather-conditions.interface';

export interface IWeatherDay {
  /** Optional maximum temperature in Celsius. */
  maxtemp_c?: number;

  /** Optional maximum temperature in Fahrenheit. */
  maxtemp_f?: number;

  /** Optional minimum temperature in Celsius. */
  mintemp_c?: number;

  /** Optional minimum temperature in Fahrenheit. */
  mintemp_f?: number;

  /** Optional average humidity percentage for the day. */
  avghumidity?: number;

  /** Optional UV index for the day. */
  uv?: number;

  /** Optional flag indicating whether it will rain during the day. */
  daily_will_it_rain?: boolean;

  /** Optional percentage chance of rain for the day. */
  daily_chance_of_rain?: number;

  /** Optional weather condition summary (icon, text, etc.). */
  condition?: IWeatherConditions;

  /** Optional air quality data. */
  air_quality?: IAQIData;

  /** Total snowfall for the day in centimeters. Defaults to 0 if not provided. */
  totalsnow_cm: number;
}
