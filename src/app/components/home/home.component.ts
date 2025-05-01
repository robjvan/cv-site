import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LauncherService } from '../../services/launcher.service';
import { IOpenApps } from '../../models/open-apps.interface';
import { SkillsDialogComponent } from '../dialogs/skills-dialog/skills-dialog.component';
import { ProjectsDialogComponent } from '../dialogs/projects-dialog/projects-dialog.component';
import { EducationDialogComponent } from '../dialogs/education-dialog/education-dialog.component';
import { SettingsDialogComponent } from '../dialogs/settings-dialog/settings-dialog.component';
import { SearchDialogComponent } from '../dialogs/search-dialog/search-dialog.component';
import { TodosDialogComponent } from '../dialogs/todos-dialog/todos-dialog.component';
import { NotesDialogComponent } from '../dialogs/notes-dialog/notes-dialog.component';
import { StlviewerDialogComponent } from '../dialogs/stlviewer-dialog/stlviewer-dialog.component';
import { AboutDialogComponent } from '../dialogs/about-dialog/about-me-dialog.component';
import { HelpDialogComponent } from '../dialogs/help-dialog/help-dialog.component';
import { AboutAppDialogComponent } from '../dialogs/about-app-dialog/about-app-dialog.component';
import { WeatherDialogComponent } from '../dialogs/weather-dialog/weather-dialog.component';
import { SettingsService } from '../../services/settings.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { TimerDialogComponent } from '../dialogs/timer-dialog/timer-dialog.component';

declare var VANTA: any;

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    SkillsDialogComponent,
    ProjectsDialogComponent,
    EducationDialogComponent,
    SettingsDialogComponent,
    SearchDialogComponent,
    TodosDialogComponent,
    NotesDialogComponent,
    StlviewerDialogComponent,
    AboutDialogComponent,
    HelpDialogComponent,
    AboutAppDialogComponent,
    WeatherDialogComponent,
    TimerDialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  private destroy$ = new Subject<void>();

  /** Constructor to inject dependencies.
   *
   * @param {SettingsService} settingsService - Service for settings changes.
   * @param {LauncherService} launcherService - Service for launcher state changes.
   */
  constructor(
    private readonly launcherService: LauncherService,
    private readonly locationService: LocationService,
    private readonly weatherService: WeatherService,
    private readonly settingsService: SettingsService
  ) {}

  /** Stores the current dark mode state as a writable signal. */
  useDarkMode: WritableSignal<boolean | undefined> = signal(undefined);

  openApps = signal<IOpenApps | undefined>(undefined);

  highestZIndex = 100;

  // Structure to store z-index values by window type
  private windowZIndices = new Map<string, number>([
    ['home', 100],
    ['about', 101],
    ['help', 102],
    ['skills', 103],
    ['projects', 104],
    ['education', 105],
    ['search', 106],
    ['todo', 107],
    ['notes', 108],
    ['stlviewer', 109],
    ['settings', 110],
    ['aboutMe', 112],
    ['weather', 113],
    ['timer', 114],
  ]);

  /** Lifecycle hook that runs on component initialization.
   * Subscribes to the theme service to update background styles dynamically.
   */
  ngOnInit(): void {
    this.openApps.set(this.launcherService.initialAppState);

    this.launcherService.openApps$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (openApps: IOpenApps) => this.openApps.set(openApps),
      error: (err: any) => console.log(err.message),
    });

    // Handle user location
    this.locationService.location$
      .pipe(
        takeUntil(this.destroy$),
        filter((val) => val === undefined)
      )
      .subscribe(() => {
        this.locationService.processUserLocation();
      });

    this.settingsService.enableWeather$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (enableWeather: boolean) => {
          if (enableWeather) {
            // Handle weather data
            this.weatherService.forecastData$
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (data) => {
                  if (!data) {
                    this.weatherService.fetchWeatherData();
                  }
                },
                error: (err) =>
                  console.error(
                    '[WeatherDialogComponent] Forecast error:',
                    err.message
                  ),
              });
          }
        },
        error: (err) => console.log(err.message),
      });
  }

  /** Lifecycle hook that runs after the view has been initialized.
   * Initializes the VANTA.WAVES animation on the background element.
   */
  ngAfterViewInit(): void {
    VANTA.CLOUDS({
      el: '#bg',
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDialogState(dialogKey: keyof IOpenApps): boolean {
    return this.openApps()![dialogKey];
  }

  bringToFront(windowName: string) {
    this.highestZIndex++;
    this.windowZIndices.set(windowName, this.highestZIndex);
  }

  getZIndex(windowName: string): number {
    return this.windowZIndices.get(windowName) ?? 1;
  }
}
