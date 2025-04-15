import { ICurrentConditions } from './current-conditions.interface';
import { IForecastDay } from './forecast-day.interface';
import { IWeatherAlert } from './weather-alert.interface';
import { IWeatherLocation } from './weather-location.interface';

export interface IForecastData {
  /** Multi-day weather forecast data (array of daily forecasts). */
  forecastDay: IForecastDay[];

  /** Current weather conditions at the specified location. */
  current: ICurrentConditions;

  /** Weather alerts issued for the location (if available). */
  alerts: { alert: IWeatherAlert[] };

  /** Metadata about the weather location (name, region, coordinates, etc.). */
  location: IWeatherLocation;
}
