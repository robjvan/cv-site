import { Component, Renderer2 } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';

/**
 * AboutDialogComponent renders the "About Me" modal dialog,
 * providing a personal summary and downloadable resume (CV).
 */
@Component({
  selector: 'about-me-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './about-me-dialog.component.html',
  styleUrl: './about-me-dialog.component.scss',
})
export class AboutDialogComponent {
  /**
   * Constructor injects the LauncherService for dialog control
   * and Renderer2 for safe DOM element creation.
   *
   * @param launcherService - Controls visibility of dialogs via app state
   * @param renderer - Angular Renderer2 API for dynamic DOM manipulation
   */
  constructor(
    private readonly launcherService: LauncherService,
    private readonly renderer: Renderer2
  ) {}

  /**
   * Closes the "About Me" dialog via the central app state.
   */
  closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.ABOUT_ME);
  }

  /**
   * Triggers a download of the resume PDF file by dynamically
   * creating and clicking an anchor (`<a>`) tag using Angular's Renderer2.
   *
   * This avoids any direct DOM access and supports SSR safety.
   */
  public serveCV(): void {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '/docs/rv_cv.pdf');
    link.click();
    link.remove();
  }
}
