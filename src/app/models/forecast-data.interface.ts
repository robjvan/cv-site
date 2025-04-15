import { ICurrentConditions } from './current-conditions.interface';
import { IForecastDay } from './forecast-day.interface';
import { IWeatherAlert } from './weather-alert.interface';
import { IWeatherLocation } from './weather-location.interface';

export interface IForecastData {
  forecastDay: IForecastDay[];
  current: ICurrentConditions;
  alerts: { alert: IWeatherAlert[] };
  location: IWeatherLocation;
}
