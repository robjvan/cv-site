import { Component, signal } from '@angular/core';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { SettingsService } from '../../services/settings.service';
import { LauncherService } from '../../services/launcher.service';
import { DialogPurpose } from '../../models/enums/dialog-purpose.enum';

@Component({
  selector: 'cupertino-bar',
  imports: [NgbModule, NgbTooltipModule],
  templateUrl: './cupertino-bar.component.html',
  styleUrl: './cupertino-bar.component.scss',
})
export class CupertinoBarComponent {
  private destroy$ = new Subject<void>();
  private subscription!: Subscription;

  time = signal<string | undefined>(undefined);
  showSeconds = false;

  constructor(
    private readonly settingsService: SettingsService,
    private readonly launcherService: LauncherService
  ) {}

  private readonly dialogMap: Record<string, DialogPurpose> = {
    about: DialogPurpose.ABOUT,
    help: DialogPurpose.HELP,
  };

  ngOnInit(): void {
    this.time.set(moment().format('ddd MMM D h:mm A'));
    this.settingsService.showSeconds$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (showSeconds: boolean) => (this.showSeconds = showSeconds),
      error: (err: any) => console.log(err.message),
    });

    this.subscription = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        if (this.showSeconds) {
          this.time.set(moment().format('ddd MMM D h:mm:ss A'));
        } else {
          this.time.set(moment().format('ddd MMM D h:mm A'));
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  showDialog(key: string) {
    const dialogPurpose = this.dialogMap[key];

    if (dialogPurpose !== undefined) {
      this.launcherService.showDialog(dialogPurpose);
    } else {
      console.warn(`No DialogPurpose mapped for type: '${key}'`);
    }
  }
}
