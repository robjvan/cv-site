import { Component } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ISkillMetric } from '../../../models/skill-metric.interface';
import {
  cloudPlatforms,
  skillsData,
  languages,
  operatingSystems,
  frameworks,
} from '../../../services/data/skills.data';

interface IDataPoint {
  label: string;
  y: number;
}

@Component({
  selector: 'skills-dialog',
  imports: [DialogWindowComponent, CanvasJSAngularChartsModule],
  templateUrl: './skills-dialog.component.html',
  styleUrl: './skills-dialog.component.scss',
})
export class SkillsDialogComponent {
  constructor() {}

  private skillsMap: Record<string, ISkillMetric[] | string> = {
    skillsData: skillsData,
    languages: languages,
    frameworks: frameworks,
    cloudPlatforms: cloudPlatforms,
    operatingSystems: operatingSystems,
  };

  private chartOptionsMap: Record<string, any> = {
    skills: {
      title: {
        text: 'Skills',
      },
      axisY: {
        includeZero: true,
      },
      backgroundColor: '#fff',
      borderWidth: 2,
      data: [
        {
          type: 'column',
          dataPoints: (this.skillsMap['skillsData'] as ISkillMetric[]).map(
            (element) => {
              return { label: element.title, y: element.value };
            }
          ),
        },
      ],
    },
    languages: {
      title: {
        text: 'Languages',
      },
      axisY: {
        includeZero: true,
      },
      backgroundColor: '#fff',
      data: [
        {
          type: 'column',
          dataPoints: (this.skillsMap['languages'] as ISkillMetric[]).map(
            (element) => {
              return { label: element.title, y: element.value };
            }
          ),
        },
      ],
    },
    frameworks: {
      title: {
        text: 'Frameworks',
      },
      axisY: {
        includeZero: true,
      },
      backgroundColor: '#fff',
      color: 'red',
      data: [
        {
          type: 'column',
          dataPoints: (this.skillsMap['frameworks'] as ISkillMetric[]).map(
            (element) => {
              return { label: element.title, y: element.value };
            }
          ),
        },
      ],
    },
    cloudPlatforms: {
      title: {
        text: 'Cloud Platforms',
      },
      axisY: {
        includeZero: true,
      },
      backgroundColor: '#fff',
      data: [
        {
          type: 'column',
          dataPoints: (this.skillsMap['cloudPlatforms'] as ISkillMetric[]).map(
            (element) => {
              return { label: element.title, y: element.value };
            }
          ),
        },
      ],
    },
    operatingSystems: {
      title: {
        text: 'Operating Systems',
      },
      axisY: {
        includeZero: true,
      },
      backgroundColor: '#fff',
      data: [
        {
          type: 'column',
          dataPoints: (
            this.skillsMap['operatingSystems'] as ISkillMetric[]
          ).map((element) => {
            return { label: element.title, y: element.value };
          }),
        },
      ],
    },
  };

  public getChartOptions(key: string) {
    return this.chartOptionsMap[key];
  }
}
