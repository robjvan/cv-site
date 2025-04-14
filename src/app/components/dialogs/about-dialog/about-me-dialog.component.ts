import { Component, Renderer2 } from '@angular/core';
import { DialogWindowComponent } from '../../dialog-window/dialog-window.component';
import { DialogPurpose } from '../../../models/enums/dialog-purpose.enum';
import { LauncherService } from '../../../services/launcher.service';

@Component({
  selector: 'about-me-dialog',
  imports: [DialogWindowComponent],
  templateUrl: './about-me-dialog.component.html',
  styleUrl: './about-me-dialog.component.scss',
})
export class AboutDialogComponent {
  constructor(
    private readonly launcherService: LauncherService,
    private readonly renderer: Renderer2
  ) {}

  closeDialog() {
    this.launcherService.closeDialog(DialogPurpose.ABOUT_ME);
  }

  /** Triggers the download of a CV PDF file by creating and clicking an anchor tag dynamically.
   */
  serveCV(): void {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '/docs/rv_cv.pdf');
    link.click();
    link.remove();
  }
}
