import { Injectable } from '@angular/core';
import {
  cloudPlatforms,
  frameworks,
  languages,
  operatingSystems,
  skillsData,
} from './data/skills.data';
import { BehaviorSubject } from 'rxjs';
import { ISkillMetric } from '../models/skill-metric.interface';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  // cloudPlatforms$ = new BehaviorSubject<ISkillMetric[]>(cloudPlatforms);
  // frameworks$ = new BehaviorSubject<ISkillMetric[]>(frameworks);
  // languages$ = new BehaviorSubject<ISkillMetric[]>(languages);
  // operatingSystems$ = new BehaviorSubject<ISkillMetric[]>(operatingSystems);
  // skillsData$ = new BehaviorSubject<ISkillMetric[]>(skillsData);

  data$: BehaviorSubject<{
    cloudPlatforms: ISkillMetric[];
    skillsData: ISkillMetric[];
    languages: ISkillMetric[];
    operatingSystems: ISkillMetric[];
    frameworks: ISkillMetric[];
  }> = new BehaviorSubject({
    cloudPlatforms: cloudPlatforms,
    skillsData: skillsData,
    languages: languages,
    operatingSystems: operatingSystems,
    frameworks: frameworks,
  });

  // public get frameworks() {
  //   return frameworks;
  // }
  // public get languages() {
  //   return languages;
  // }
  // public get operatingSystems() {
  //   return operatingSystems;
  // }
  // public get skillsData() {
  //   return skillsData;
  // }
}
