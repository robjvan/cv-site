import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'cv-button',
  imports: [CommonModule],
  templateUrl: './cv-button.component.html',
  styleUrl: './cv-button.component.scss',
})
export class CvButtonComponent {
  label = input<string>('');
  width = input<string>('500px');
  disabled = input<boolean>(false);

  @Input() action?: () => void;

  public fireAction(): void {
    if (this.action) {
      this.action;
    } else {
      console.warn('No action defined for CvButtonComponent');
    }
  }
}
