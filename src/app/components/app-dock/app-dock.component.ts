import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { LauncherService } from '../../services/launcher.service';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogPurpose } from '../../models/enums/dialog-purpose.enum';
import { IOpenApps } from '../../models/open-apps.interface';
import { IDialogLink } from '../../models/dialog-link.interface';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

/** AppDockComponent renders a dock-like interface similar to a taskbar.
 *
 * It provides quick access to dialogs (like Skills, Projects, Education)
 * and apps (like Todos, Notes, STL Viewer, etc.).
 */
@Component({
  selector: 'app-dock',
  imports: [NgbModule, NgbTooltipModule, RouterModule],
  templateUrl: './app-dock.component.html',
  styleUrl: './app-dock.component.scss',
})
export class AppDockComponent implements OnInit {
  private destroy$ = new Subject<void>();

  /** Writable signal to store the current state of open apps.
   * This is kept reactive to reflect real-time UI updates.
   */
  public openApps: WritableSignal<IOpenApps | undefined> = signal(undefined);

  /** Array of personal info dialog buttons.
   * Each item includes a tooltip, icon class, and an action callback to trigger dialog.
   */
  public dialogLinks: IDialogLink[] = [];

  /** Array of app shortcut buttons.
   * These are interactive tools or utilities the user can open.
   */
  public appLinks: IDialogLink[] = [];

  /** Home button configuration.
   * Navigates the user to the root (home) route.
   */
  public homeBtn: IDialogLink = {
    tooltip: 'Close All',
    action: () => this.closeAllDialogs(),
    class: 'bi bi-house',
    openCheck: false,
  };

  /** Settings button configuration.
   * Opens the settings dialog via route navigation.
   */
  public settingsBtn: IDialogLink = {
    tooltip: 'Settings',
    action: () => this.openDialog(DialogPurpose.SETTINGS),
    class: 'bi bi-gear',
    openCheck: this.openApps()?.showSettingsDialog!,
  };

  /** Constructor injects required services.
   *
   * @param {LauncherService} launcherService Provides the observable stream of open applications.
   * @param {Router} router Angular's Router service for navigation between routes.
   */
  constructor(
    private readonly launcherService: LauncherService,
    private readonly router: Router
  ) {}

  /** Angular lifecycle hook.
   * Subscribes to open apps stream on initialization to keep UI in sync.
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

  /** Angular lifecycle hook.
   * Cleans up any subscriptions to avoid memory leaks.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Handles opening dialogs or navigation based on dialog purpose.
   *
   * @param {DialogPurpose} target DialogPurpose enum indicating which dialog to open.
   */
  public openDialog(target: DialogPurpose) {
    this.launcherService.showDialog(target);
  }

  /** Close all open dialogs to show the home page. */
  public closeAllDialogs(): void {
    this.launcherService.closeAllDialogs();
  }

  private populateLinks(data: IOpenApps): void {
    // Populate the info about me sections
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
    ];
  }
}
