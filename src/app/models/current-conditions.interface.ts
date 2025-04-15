import { IAQIData } from './aqi-data.interface';
import { IWeatherConditions } from './weather-conditions.interface';

export interface ICurrentConditions {
  air_quality: IAQIData;
  condition: IWeatherConditions;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  is_day: boolean;
  last_updated: string;
  last_updated_epoch: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  uv: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
}
