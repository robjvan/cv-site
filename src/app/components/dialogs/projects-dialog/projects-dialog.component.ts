import { Component, signal, WritableSignal } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { IProjectData } from '../../../models/project-data.interface';
import { projectsData } from '../../../services/data/projects.data';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * ProjectsDialogComponent displays a list of featured projects in a carousel layout.
 *
 * Project data is reactive and stored using Angular signals for UI updates.
 */
@Component({
  selector: 'projects-dialog',
  imports: [DialogWindowComponent, NgbCarouselModule],
  templateUrl: './projects-dialog.component.html',
  styleUrl: './projects-dialog.component.scss',
})
export class ProjectsDialogComponent {
  /**
   * Writable signal containing the full list of project data.
   * Initialized on component load.
   */
  projectList: WritableSignal<IProjectData[]> = signal([]);

  /**
   * Angular lifecycle hook to load project data on initialization.
   * Assigns statically imported data to the reactive signal.
   */
  ngOnInit() {
    this.projectList.set(projectsData);
  }
}
