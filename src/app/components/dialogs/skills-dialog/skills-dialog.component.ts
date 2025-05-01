import { Component, OnInit } from '@angular/core';
import { DialogWindowComponent } from '../../common/dialog-window/dialog-window.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { ISkillMetric } from '../../../models/skill-metric.interface';
import { CommonModule } from '@angular/common';
import { DownloadService } from '../../../services/download.service';
import {
  skillsData,
  languages,
  frameworks,
  cloudPlatforms,
  operatingSystems,
} from '../../../data/personal-info.data';
import { CvButtonComponent } from '../../common/cv-button/cv-button.component';

/**
 * SkillsDialogComponent renders a multi-tabbed view of categorized skills
 * using dynamic CanvasJS charts. It also allows users to export their skills
 * and experience as a printable PDF.
 *
 * Tabs include: Core Skills, Programming Languages, Frameworks, Cloud Platforms,
 * and Operating Systems. Each tab contains animated charts and toggles.
 */
@Component({
  selector: 'skills-dialog',
  imports: [
    DialogWindowComponent,
    CanvasJSAngularChartsModule,
    MatTabsModule,
    CommonModule,
    CvButtonComponent,
  ],
  templateUrl: './skills-dialog.component.html',
  styleUrl: './skills-dialog.component.scss',
})
export class SkillsDialogComponent implements OnInit {
  /**
   * Constructor injects the custom download service for PDF generation.
   *
   * @param printService - Handles PDF export of skills data.
   */
  constructor(private readonly printService: DownloadService) {}

  /**
   * Angular lifecycle hook. Initializes chart visibility after delay
   * to ensure the DOM is ready for rendering CanvasJS charts.
   */
  ngOnInit(): void {
    this.activeTabIndex = 0;

    // Initially hide all charts to prevent flicker during render
    Object.keys(this.chartVisible).forEach(
      (key) => (this.chartVisible[key] = false)
    );

    // Slight delay allows DOM to catch up before showing the chart
    setTimeout(() => (this.chartVisible['skills'] = true), 50);
  }

  /**
   * Tracks which tab is currently active.
   * Used to toggle chart rendering based on tab state.
   */
  public activeTabIndex: number = 0;

  /**
   * Chart visibility map used to control render timing.
   * Charts are hidden when switching tabs to avoid render glitches.
   */
  public chartVisible: Record<string, boolean> = {
    skills: true,
    languages: false,
    frameworks: false,
    cloudPlatforms: false,
    operatingSystems: false,
  };

  /**
   * Called whenever the user changes tabs.
   * It resets all chart visibility and enables the relevant charts
   * with a short delay to allow for smooth DOM updates.
   *
   * @param event - Angular Material tab event containing tab index.
   */
  public onTabChange(event: any): void {
    this.activeTabIndex = event.index;

    // Temporarily hide all charts
    Object.keys(this.chartVisible).forEach(
      (key) => (this.chartVisible[key] = false)
    );

    // Re-enable selected chart(s) after DOM settles
    setTimeout(() => {
      switch (event.index) {
        case 0:
          this.chartVisible['skills'] = true;
          break;
        case 1:
          this.chartVisible['languages'] = true;
          this.chartVisible['frameworks'] = true;
          break;
        case 2:
          this.chartVisible['cloudPlatforms'] = true;
          this.chartVisible['operatingSystems'] = true;
          break;
      }
      // if (event.index === 0) this.chartVisible['skills'] = true;
      // if (event.index === 1) {
      //   this.chartVisible['languages'] = true;
      //   this.chartVisible['frameworks'] = true;
      // }
      // if (event.index === 2) {
      //   this.chartVisible['cloudPlatforms'] = true;
      //   this.chartVisible['operatingSystems'] = true;
      // }
    }, 50); // slight delay to allow DOM to initialize
  }

  /**
   * Skill data mapped by category key.
   * Used to generate data points for CanvasJS chart rendering.
   */
  private skillsMap: Record<string, ISkillMetric[] | string> = {
    skillsData: skillsData,
    languages: languages,
    frameworks: frameworks,
    cloudPlatforms: cloudPlatforms,
    operatingSystems: operatingSystems,
  };

  /**
   * Chart configuration map for CanvasJS.
   * Each key corresponds to a tab/category, containing chart options and data points.
   */
  private chartOptionsMap: Record<string, any> = {
    skills: {
      title: {
        text: 'Skills',
      },
      axisY: {
        includeZero: true,
        maximum: 10,
      },
      backgroundColor: '#fff',
      borderWidth: 2,
      data: [
        {
          type: 'column',
          dataPoints: (this.skillsMap['skillsData'] as ISkillMetric[]).map(
            (element: ISkillMetric) => {
              return {
                label: element.title,
                y: element.value,
              };
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
        maximum: 10,
      },
      backgroundColor: '#fff',
      data: [
        {
          type: 'column',
          dataPoints: (this.skillsMap['languages'] as ISkillMetric[]).map(
            (element: ISkillMetric) => {
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
        maximum: 10,
      },
      backgroundColor: '#fff',
      color: 'red',
      data: [
        {
          type: 'column',
          dataPoints: (this.skillsMap['frameworks'] as ISkillMetric[]).map(
            (element: ISkillMetric) => {
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
        maximum: 10,
      },
      backgroundColor: '#fff',
      data: [
        {
          type: 'column',
          dataPoints: (this.skillsMap['cloudPlatforms'] as ISkillMetric[]).map(
            (element: ISkillMetric) => {
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
        maximum: 10,
      },
      backgroundColor: '#fff',
      data: [
        {
          type: 'column',
          dataPoints: (
            this.skillsMap['operatingSystems'] as ISkillMetric[]
          ).map((element: ISkillMetric) => {
            return { label: element.title, y: element.value };
          }),
        },
      ],
    },
  };

  /**
   * Retrieves the appropriate chart options object for the given category key.
   *
   * @param {string} key - The category name (e.g. 'skills', 'languages').
   * @returns A CanvasJS options object.
   */
  public getChartOptions(key: string) {
    return this.chartOptionsMap[key];
  }

  /**
   * Downloads a PDF summary of the user's skills, grouped by category.
   * Includes a personalized paragraph overview and exported chart data.
   */
  public printSkills = (): void => {
    const summary = `I bring a broad, practical skill set in full-stack and mobile development, with a strong foundation in support, diagnostics, and embedded integration. \n\n On the frontend, I work confidently with Flutter, Angular, Bootstrap, and responsive UI frameworks. On the backend, I’ve built secure REST APIs using NestJS, Node.js, PostgreSQL, and MongoDB, often integrating third-party services like Stripe, OpenAI, and Firebase. \n\n I have used Redux (and Thunk) for state management in both mobile and web contexts. My projects have included a Flutter-based e-commerce app with cloud backend, a barcode/ISBN scanning app using the Google Books API, and a 3D printing service built on microservices. \n\n Other skills include Git workflows, 3D modeling, barcode scanning, camera-based input, and cross-platform deployment. \n\n I’m equally comfortable in Windows, macOS, and Linux environments. \n\n I’m a quick learner and enjoy tackling new challenges. I’m always looking for opportunities to expand my skill set and take on new projects.`;

    const categories = {
      'Core Skills': skillsData,
      Languages: languages,
      Frameworks: frameworks,
      'Cloud Platforms': cloudPlatforms,
      'Operating Systems': operatingSystems,
    };

    this.printService.downloadSkillsPdf(categories, summary);
  };
}
