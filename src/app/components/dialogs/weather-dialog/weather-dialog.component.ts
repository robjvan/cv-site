import { Component, computed, OnInit, signal } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { LocationService } from '../../../services/location.service';
import { WeatherService } from '../../../services/weather.service';
import { IForecastData } from '../../../models/forecast-data.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'weather-dialog',
  imports: [DialogWindowComponent, DecimalPipe],
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.scss'],
})
export class WeatherDialogComponent implements OnInit {
  private destroy$ = new Subject<void>();

  // Signals
  public forecastData = signal<IForecastData | undefined>(undefined);
  private hasRequestedWeather = false;
  public locationAllowed = signal<boolean>(false);

  // Reactive computed signal
  public isLoading = computed(() => {
    return !this.forecastData() && this.hasRequestedWeather;
  });

  constructor(
    private readonly launcherService: LauncherService,
    private readonly locationService: LocationService,
    private readonly weatherService: WeatherService
  ) {}

  public ngOnInit() {
    this.locationService.locationAllowed$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (locationAllowed: boolean) =>
          this.locationAllowed.set(locationAllowed),
        error: (err) => console.error(err),
      });

    // Handle weather data
    this.weatherService.forecastData$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.forecastData.set(data);
      },
      error: (err) =>
        console.error('[WeatherDialogComponent] Forecast error:', err.message),
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public refreshWeather(): void {
    this.forecastData.set(undefined);
    this.weatherService.fetchWeatherData();
  }

  public closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.WEATHER);
  }
}
