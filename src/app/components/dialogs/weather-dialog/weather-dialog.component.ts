import {
  Component,
  computed,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { LocationService } from '../../../services/location.service';
import { WeatherService } from '../../../services/weather.service';
import { DecimalPipe } from '@angular/common';
import { IForecastData } from '../../../models/weather-data/forecast-data.interface';

/**
 * WeatherDialogComponent provides a full-screen weather forecast view.
 *
 * It consumes real-time weather data from the WeatherService and reacts
 * to location permission changes via the LocationService. Data loading
 * is reflected via reactive computed signals.
 */
@Component({
  selector: 'weather-dialog',
  imports: [DialogWindowComponent, DecimalPipe],
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.scss'],
})
export class WeatherDialogComponent implements OnInit {
  /** Subject used to clean up subscriptions on destroy. */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Writable signal holding the latest forecast data.
   * Set to `undefined` initially and updated as data loads.
   */
  public forecastData: WritableSignal<IForecastData | undefined> = signal<
    IForecastData | undefined
  >(undefined);

  /**
   * Indicates whether the user has granted location permissions.
   * Controls conditional UI rendering of weather-related data.
   */
  public locationAllowed: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Computed signal indicating loading state.
   * Will be `true` when data is being fetched but not yet available.
   */
  public isLoading: Signal<boolean> = computed(() => {
    return !this.forecastData() && this.hasRequestedWeather;
  });

  /**
   * Internal flag to indicate whether the user has requested weather data.
   * Used to distinguish initial loading from refresh.
   */
  private hasRequestedWeather: boolean = false;

  /**
   * Constructor injects required services for weather, location, and dialog control.
   *
   * @param {LauncherService} launcherService - Handles dialog open/close behavior.
   * @param {LocationService} locationService - Emits real-time location permission status.
   * @param {WeatherService} weatherService - Provides weather forecast and refresh operations.
   */
  constructor(
    private readonly launcherService: LauncherService,
    private readonly locationService: LocationService,
    private readonly weatherService: WeatherService
  ) {}

  /**
   * Angular lifecycle hook that subscribes to weather and location streams.
   *
   * Synchronizes UI state using Angular signals and RxJS.
   */
  public ngOnInit(): void {
    // Subscribe to location permission changes
    this.locationService.locationAllowed$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (locationAllowed: boolean) =>
          this.locationAllowed.set(locationAllowed),
        error: (err) =>
          console.error('[WeatherDialogComponent] Location error:', err),
      });

    // Subscribe to incoming forecast data
    this.weatherService.forecastData$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: IForecastData | undefined) => {
        this.forecastData.set(data);
      },
      error: (err) =>
        console.error('[WeatherDialogComponent] Forecast error:', err.message),
    });
  }

  /**
   * Angular lifecycle hook to clean up all subscriptions on component destroy.
   * Prevents memory leaks from lingering observables.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Forces a refresh of weather data.
   * Resets the forecast signal and triggers a new data fetch.
   */
  public refreshWeather(): void {
    this.forecastData.set(undefined);
    this.weatherService.fetchWeatherData();
  }

  /**
   * Closes the weather dialog using the launcher service.
   * Typically triggered via UI button.
   */
  public closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.WEATHER);
  }
}
