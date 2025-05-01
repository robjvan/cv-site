import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DialogPurpose } from '../../../../models/enums/dialog-purpose.enum';
import { IForecastData } from '../../../../models/weather-models/forecast-data.interface';
import { LauncherService } from '../../../../services/launcher.service';
import { LocationService } from '../../../../services/location.service';
import { WeatherService } from '../../../../services/weather.service';

/**
 * WeatherWidgetComponent displays a compact weather summary.
 *
 * This widget pulls live forecast data based on the user's location permissions,
 * and can trigger a full weather dialog view when interacted with.
 */
@Component({
  selector: 'weather-widget',
  imports: [DecimalPipe],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
})
export class WeatherWidgetComponent implements OnInit {
  /** Subject to terminate active RxJS subscriptions on component teardown. */
  private destroy$ = new Subject<void>();

  /**
   * Signal that holds the current weather forecast data.
   * This updates automatically when new data is received.
   */
  public forecastData = signal<IForecastData | undefined>(undefined);

  /**
   * Signal indicating whether location services are permitted by the user.
   * This controls conditional display or messaging in the UI.
   */
  public locationAllowed = signal<boolean>(false);

  /**
   * Constructor injects the services needed for location access,
   * weather data streaming, and dialog interactions.
   *
   * @param {WeatherService} weatherService - Emits updated forecast information.
   * @param {LocationService} locationService - Provides geolocation access state.
   * @param {LauncherService} launcherService - Manages UI dialogs.
   */
  constructor(
    private readonly weatherService: WeatherService,
    private readonly locationService: LocationService,
    private readonly launcherService: LauncherService
  ) {}

  /**
   * Angular lifecycle hook that initializes subscriptions.
   *
   * Subscribes to both the location permission stream and weather data stream.
   * Ensures reactivity and automatic UI updates via signals.
   */
  ngOnInit(): void {
    // Subscribe to location permission status
    this.locationService.locationAllowed$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (locationAllowed: boolean) =>
          this.locationAllowed.set(locationAllowed),
        error: (err) =>
          console.error(
            '[WeatherWidget] Error getting location permission: ',
            err.message
          ),
      });

    // Subscribe to weather forecast data stream
    this.weatherService.forecastData$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (forecastData: IForecastData | undefined) =>
        this.forecastData.set(forecastData),
      error: (err) =>
        console.error(
          '[WeatherWidget] Error getting weather forecast data: ',
          err.message
        ),
    });
  }

  /**
   * Opens the full weather dialog view from the widget.
   * This allows users to view expanded forecast information.
   */
  public openWeatherDialog(): void {
    this.launcherService.showDialog(DialogPurpose.WEATHER);
  }
}
