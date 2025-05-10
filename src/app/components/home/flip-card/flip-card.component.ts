import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { FlipCardData } from './flip-card-data';

@Component({
  selector: 'flip-card',
  standalone: true,
  imports: [],
  templateUrl: './flip-card.component.html',
  styleUrl: './flip-card.component.scss',
})
export class FlipCardComponent {
  @Output() clicked = new EventEmitter();
  data: InputSignal<FlipCardData> = input.required<FlipCardData>();

  get blurb(): string {
    return this.data().blurb;
  }

  get title(): string {
    return this.data().title;
  }

  get imgSrc(): string {
    return this.data().imgSrc;
  }

  handleCardClick() {
    this.clicked.emit(this.data().title);
  }
}
