import { Component, Renderer2 } from '@angular/core';
import { CvButtonComponent } from '../common/cv-button/cv-button.component';

@Component({
  selector: 'mobile-ui',
  imports: [CvButtonComponent],
  templateUrl: './mobile-ui.component.html',
  styleUrl: './mobile-ui.component.scss',
})
export class MobileUiComponent {
  constructor(private readonly renderer: Renderer2) {}

  /**
   * Triggers a download of the resume PDF file by dynamically
   * creating and clicking an anchor (`<a>`) tag using Angular's Renderer2.
   *
   * This avoids any direct DOM access and supports SSR safety.
   */
  public serveCV = (): void => {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '/docs/rv_cv.pdf');
    link.click();
    link.remove();
  };
}
