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
import { LocationService } from './location.service';
import { IUserLocation } from '../models/user-location.interface';
import { HttpClient } from '@angular/common/http';
import { IForecastData } from '../models/weather-models/forecast-data.interface';

/**
 * WeatherService retrieves weather data from a remote API provider.
 *
 * It reacts to permission and location updates from LocationService
 * and emits forecast data to subscribers via a BehaviorSubject.
 */
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  /** RxJS Subject used to cleanly unsubscribe from observables on destroy. */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Emits the latest forecast data or `undefined` if unavailable.
   * Used by weather-related components to render forecasts reactively.
   */
  public forecastData$: BehaviorSubject<IForecastData | undefined> =
    new BehaviorSubject<IForecastData | undefined>(undefined);

  /**
   * Constructor injects location tracking and HTTP client services.
   *
   * @param locationService - Emits location and permission updates.
   * @param http - Angular HttpClient used to call weather API.
   */
  constructor(
    private readonly locationService: LocationService,
    private readonly http: HttpClient
  ) {}

  /**
   * Initiates a weather data fetch by:
   * 1. Waiting for location permission,
   * 2. Listening to current coordinates,
   * 3. Requesting forecast from remote API.
   *
   * Uses a chained observable flow with cleanup and error handling.
   */
  public fetchWeatherData() {
    try {
      console.debug('[WeatherService] Fetching weather data...');

      this.locationService.locationAllowed$
        .pipe(
          takeUntil(this.destroy$),
          filter((allowed) => allowed), // Proceed only if user allowed geolocation
          switchMap(() =>
            this.locationService.location$.pipe(
              filter((loc): loc is IUserLocation => !!loc), // Type guard ensures location is defined
              takeUntil(this.destroy$),
              switchMap((location: IUserLocation) => {
                return this.http
                  .post<IForecastData>(
                    'https://weather-api-458802.nn.r.appspot.com',
                    {
                      lat: location.lat,
                      lon: location.lon,
                    }
                  )
                  .pipe(
                    catchError((err: any) => {
                      console.error(
                        '[WeatherService] HTTP error:',
                        err.message
                      );
                      return of(undefined); // Continue stream with a fallback value
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

  /**
   * Completes the internal subject to unsubscribe from observables
   * and release memory. Should be called on service teardown if needed.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
