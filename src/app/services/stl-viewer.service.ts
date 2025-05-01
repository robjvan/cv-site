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
  private selectedColorSubject = new BehaviorSubject<string>('#da660b');
  private selectedModelSubject = new BehaviorSubject<string>('');

  public selectedColor$ = this.selectedColorSubject.asObservable();
  public selectedModel$ = this.selectedModelSubject.asObservable();

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

  private modelList: { filename: string; thumb: string }[] = [
    { filename: 'stl/3dbenchy.stl', thumb: 'images/thumbnails/3dbenchy.jpg' },
    {
      filename: 'stl/beard-skull.stl',
      thumb: 'images/thumbnails/beard-skull.jpeg',
    },
    { filename: 'stl/xyz-cube.stl', thumb: 'images/thumbnails/xyz-cube.png' },
  ];

  get colors(): IColor[] {
    return this.colorSet;
  }

  get models(): { filename: string; thumb: string }[] {
    return this.modelList;
  }

  selectColor(color: string) {
    this.selectedColorSubject.next(color);
  }

  selectModel(filename: string) {
    this.selectedModelSubject.next(filename);
  }

  public resetModelAndColor() {
    this.selectedModelSubject.next('');
    this.selectedColorSubject.next('#da660b');
  }
}
