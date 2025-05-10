export interface IAQIData {
  /** Carbon Monoxide concentration (μg/m³). */
  co?: number;

  /** Nitrogen Dioxide concentration (μg/m³). */
  no2?: number;

  /** Ozone concentration (μg/m³). */
  o3?: number;

  /** Sulphur Dioxide concentration (μg/m³). */
  so2?: number;

  /** Particulate matter (PM2.5) concentration (μg/m³). */
  pm2_5?: number;

  /** Particulate matter (PM10) concentration (μg/m³). */
  pm10?: number;

  /** US EPA air quality index (1 = Good, 6 = Hazardous). */
  us_epa_index?: number;

  /** UK DEFRA air quality index (1 = Low, 10 = Very High). */
  gb_defra_index?: number;
}
