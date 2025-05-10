import { Component, input } from '@angular/core';
import { IProjectData } from '../../../../models/project-data.interface';

@Component({
  selector: 'project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  project = input.required<IProjectData>();
}
