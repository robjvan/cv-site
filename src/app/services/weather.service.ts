import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { apiUrl, apiKey } from '../constants';
import { LocationService } from './location.service';
import { IUserLocation } from '../models/user-location.interface';

import { HttpClient } from '@angular/common/http';
import { IForecastData } from '../models/weather-data/forecast-data.interface';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    private readonly locationService: LocationService,
    private readonly http: HttpClient
  ) {}

  private destroy$: Subject<void> = new Subject<void>();

  public forecastData$: BehaviorSubject<IForecastData | undefined> =
    new BehaviorSubject<IForecastData | undefined>(undefined);

  // Fetches the raw weather data from the service provider.
  public fetchWeatherData() {
    try {
      console.debug('[WeatherService] Fetching weather data...');

      this.locationService.locationAllowed$
        .pipe(
          takeUntil(this.destroy$),
          filter((allowed) => allowed), // Only proceed if allowed
          switchMap(() =>
            this.locationService.location$.pipe(
              filter((loc): loc is IUserLocation => !!loc),
              takeUntil(this.destroy$),
              switchMap((location) => {
                const url = `${apiUrl}${apiKey}&q=${location.lat},${location.lon}&days=5&aqi=yes&alerts=yes`;
                return this.http.post<IForecastData>(url, null).pipe(
                  catchError((err) => {
                    console.error('[WeatherService] HTTP error:', err);
                    return of(undefined);
                  })
                );
              })
            )
          )
        )
        .subscribe({
          next: (forecastData) => {
            if (forecastData) {
              this.forecastData$.next(forecastData);
            } else {
              console.warn('[WeatherService] No forecast data returned.');
            }
          },
          error: (err) =>
            console.error('[WeatherService] Unexpected error in stream:', err),
        });
    } catch (err: any) {
      console.error(
        `[WeatherService] Failed to fetch weather data from service provider`,
        err.message
      );
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
