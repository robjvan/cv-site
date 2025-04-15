import { IAstroData } from './astro-data.interface';
import { IHourlyData } from './hourly-data.interface';
import { IWeatherDay } from './weather-day.interface';

export interface IForecastDay {
  date?: string;
  date_epoch?: number;
  day?: IWeatherDay; // ApiDay in forecast_mobile
  astro?: IAstroData; // ApiAstro in forecast_mobile
  hour?: IHourlyData[]; // APIHour  in forecast_mobile
}
