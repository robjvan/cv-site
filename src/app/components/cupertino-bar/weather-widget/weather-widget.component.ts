import { Component, OnInit, signal } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { DecimalPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { LocationService } from '../../../services/location.service';
import { IForecastData } from '../../../models/weather-data/forecast-data.interface';

@Component({
  selector: 'weather-widget',
  imports: [DecimalPipe],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
})
export class WeatherWidgetComponent implements OnInit {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly weatherService: WeatherService,
    private readonly locationService: LocationService
  ) {}

  public forecastData = signal<IForecastData | undefined>(undefined);
  public locationAllowed = signal<boolean>(false);

  ngOnInit(): void {
    this.locationService.locationAllowed$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (locationAllowed: boolean) =>
          this.locationAllowed.set(locationAllowed),
        error: (err) => console.error(err),
      });

    this.weatherService.forecastData$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (forecastData: IForecastData | undefined) =>
        this.forecastData.set(forecastData),
      error: (err) => console.error(err),
    });
  }
}
