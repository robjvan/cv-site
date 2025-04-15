import { IAQIData } from './aqi-data.interface';
import { IWeatherConditions } from './weather-conditions.interface';

export interface IHourlyData {
  // "APIHour" in mobile
  time?: string;
  wind_dir?: string;
  temp_c?: number;
  temp_f?: number;
  wind_mph?: number;
  wind_kph?: number;
  pressure_mb?: number;
  pressure_in?: number;
  feelslike_c?: number;
  feelslike_f?: number;
  will_it_rain?: boolean;
  will_it_snow?: boolean;
  wind_degree?: number;
  time_epoch?: number;
  humidity?: number;
  cloud?: number;
  chance_of_rain?: number;
  uv?: number;
  air_quality?: IAQIData;
  condition?: IWeatherConditions;
}
