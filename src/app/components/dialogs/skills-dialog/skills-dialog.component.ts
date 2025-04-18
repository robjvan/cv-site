import { Component, OnInit } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
// import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { SkillsService } from '../../../services/skills.service';
import { ISkillMetric } from '../../../models/skill-metric.interface';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'skills-dialog',
  imports: [DialogWindowComponent, CanvasJSAngularChartsModule],
  templateUrl: './skills-dialog.component.html',
  styleUrl: './skills-dialog.component.scss',
})
export class SkillsDialogComponent implements OnInit {
  constructor(
    private readonly launcherService: LauncherService,
    private readonly skillsService: SkillsService
  ) {}

  private skillsMap: Record<string, ISkillMetric[]> = {};

  ngOnInit(): void {
    this.skillsService.data$.pipe(take(1)).subscribe({
      next: (val) => {
        // TODO(RV): Add logic
      },
      error: (err) => console.log('Failed to load skills data', err.messsage),
    });
  }

  cloudPlatformsChartOptions = {
    title: {
      text: 'Basic Column Chart',
    },
    data: [
      {
        type: 'column',
        dataPoints: [
          { label: 'Apple', y: 10 },
          { label: 'Orange', y: 15 },
          { label: 'Banana', y: 25 },
          { label: 'Mango', y: 30 },
          { label: 'Grape', y: 28 },
        ],
      },
    ],
  };

  processData(key: string): void {}
}
