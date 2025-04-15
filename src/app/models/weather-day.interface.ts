import { IAQIData } from './aqi-data.interface';
import { IWeatherConditions } from './weather-conditions.interface';

export interface IWeatherDay {
  // "APIDay" in mobile app
  maxtemp_c?: number;
  maxtemp_f?: number;
  mintemp_c?: number;
  mintemp_f?: number;
  avghumidity?: number;
  uv?: number;
  daily_will_it_rain?: boolean;
  daily_chance_of_rain?: number;
  condition?: IWeatherConditions;
  air_quality?: IAQIData;
  totalsnow_cm: 0;
}
