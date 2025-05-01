import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { LauncherService } from '../../../services/launcher.service';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IDialogLink } from '../../../models/dialog-link.interface';
import { IOpenApps } from '../../../models/open-apps.interface';

/**
 * The AppDockComponent represents a UI dock similar to a taskbar.
 *
 * It provides quick-launch buttons for both personal dialogs (About Me, Skills, etc.)
 * and application tools (Todos, Notes, STL Viewer, etc.).
 * This component is reactive and updates live with the state of open apps.
 *
 * It supports routing (e.g., to settings) and uses Bootstrap icons/tooltips for UX polish.
 */
@Component({
  selector: 'app-dock',
  imports: [NgbModule, NgbTooltipModule, RouterModule],
  templateUrl: './app-dock.component.html',
  styleUrl: './app-dock.component.scss',
})
export class AppDockComponent implements OnInit {
  /** Subject to trigger cleanup of subscriptions on component destroy. */
  private destroy$ = new Subject<void>();

  /**
   * Writable reactive signal holding the current state of open apps/dialogs.
   */
  public openApps: WritableSignal<IOpenApps | undefined> = signal(undefined);

  /**
   * List of dock buttons for personal info dialogs (e.g., About Me, Skills).
   * Each button has an icon, tooltip, and action handler.
   */
  public dialogLinks: IDialogLink[] = [];

  /**
   * List of dock buttons for application tools (e.g., Todos, Notes, STL Viewer).
   */
  public appLinks: IDialogLink[] = [];

  /**
   * Dock button for closing all dialogs.
   */
  public homeBtn: IDialogLink = {
    tooltip: 'Close All',
    action: () => this.launcherService.closeAllDialogs(),
    class: 'bi bi-house',
    openCheck: false,
  };

  /**
   * Dock button for opening the Settings dialog.
   */
  public settingsBtn: IDialogLink = {
    tooltip: 'Settings',
    action: () => this.openDialog(DialogPurpose.SETTINGS),
    class: 'bi bi-gear',
    openCheck: this.openApps()?.showSettingsDialog!,
  };

  /**
   * Component constructor, injects services for launching apps/dialogs and navigation.
   *
   * @param {LauncherService} launcherService - Manages open app/dialog state.
   * @param {Router} router - Angular's router for navigation.
   */
  constructor(
    private readonly launcherService: LauncherService,
    private readonly router: Router
  ) {}

  /**
   * Angular lifecycle hook that initializes the component.
   *
   * Subscribes to the launcherService's observable stream to sync the dock
   * with the currently open applications in real-time.
   */
  public ngOnInit(): void {
    this.launcherService.openApps$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (val: IOpenApps) => {
        // Update the signal with latest open apps
        this.openApps.set(val);

        // Add links to the app dock
        this.populateLinks(val);
      },
      error: (err) => console.log(err.message),
    });
  }

  /**
   * Angular lifecycle hook to clean up observables and avoid memory leaks.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Triggers a dialog to open based on the given dialog purpose.
   *
   * @param {DialogPurpose} target - Enum value identifying the dialog to open.
   */
  public openDialog(target: DialogPurpose) {
    this.launcherService.showDialog(target);
  }

  /**
   * Populates both `dialogLinks` and `appLinks` arrays with button definitions
   * that reflect the current open state and available dialog/app options.
   *
   * This function is re-run every time the app state changes.
   *
   * @param {IOpenApps} data - The current state of open apps and dialogs.
   */
  private populateLinks(data: IOpenApps): void {
    // Populate personal information section
    this.dialogLinks = [
      {
        tooltip: 'About Me',
        action: () => this.openDialog(DialogPurpose.ABOUT_ME),
        class: 'bi bi-person',
        openCheck: data.showAboutMeDialog!,
      },
      {
        tooltip: 'Skills',
        action: () => this.openDialog(DialogPurpose.SKILLS),
        class: 'bi bi-list-stars',
        openCheck: data.showSkillsDialog!,
      },
      {
        tooltip: 'Projects',
        action: () => this.openDialog(DialogPurpose.PROJECTS),
        class: 'bi bi-code-slash',
        openCheck: data.showProjectsDialog!,
      },
      {
        tooltip: 'Education',
        action: () => this.openDialog(DialogPurpose.EDUCATION),
        class: 'bi bi-mortarboard',
        openCheck: data.showEducationDialog!,
      },
    ];

    // Populate the app section
    this.appLinks = [
      {
        tooltip: 'Weather',
        action: () => this.openDialog(DialogPurpose.WEATHER),
        class: 'bi bi-brightness-high',
        openCheck: data.showWeatherApp!,
      },
      {
        tooltip: 'Search',
        action: () => this.openDialog(DialogPurpose.SEARCH),
        class: 'bi bi-search',
        openCheck: data.showSearchApp!,
      },
      {
        tooltip: 'Todos',
        action: () => this.openDialog(DialogPurpose.TODOS),
        class: 'bi bi-check2-square',
        openCheck: data.showTodoApp!,
      },
      {
        tooltip: 'Notes',
        action: () => this.openDialog(DialogPurpose.NOTES),
        class: 'bi bi-journal-text',
        openCheck: data.showNotesApp!,
      },
      {
        tooltip: 'STL Viewer',
        action: () => this.openDialog(DialogPurpose.STLVIEWER),
        class: 'bi bi-badge-3d',
        openCheck: data.show3dViewerApp!,
      },
      {
        tooltip: 'Timer',
        action: () => this.openDialog(DialogPurpose.TIMER),
        class: 'bi bi-stopwatch',
        openCheck: data.showTimerDialog!,
      },
    ];
  }
}
