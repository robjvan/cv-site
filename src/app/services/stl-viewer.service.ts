import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  BLACK,
  RED,
  GREEN,
  BLUE,
  WHITE,
  PURPLE,
  PINK,
  YELLOW,
  ORANGE,
  LIGHTBLUE,
} from '../constants';
import { IColor } from '../models/color.interface';

@Injectable({
  providedIn: 'root',
})
export class StlViewerService {
  constructor() {}

  private colorSet: IColor[] = [
    {
      name: 'black',
      code: BLACK,
    },
    {
      name: 'red',
      code: RED,
    },
    {
      name: 'green',
      code: GREEN,
    },
    {
      name: 'blue',
      code: BLUE,
    },
    {
      name: 'white',
      code: WHITE,
    },
    {
      name: 'purple',
      code: PURPLE,
    },
    {
      name: 'pink',
      code: PINK,
    },
    {
      name: 'yellow',
      code: YELLOW,
    },
    {
      name: 'orange',
      code: ORANGE,
    },
    {
      name: 'lightBlue',
      code: LIGHTBLUE,
    },
  ];

  selectedColor$: BehaviorSubject<string> = new BehaviorSubject<string>(ORANGE);

  get colors(): IColor[] {
    return this.colorSet;
  }

  setSelectedColor(color: IColor): void {
    this.selectedColor$.next(`${color.code}`);
  }
}
