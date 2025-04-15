import { Injectable } from '@angular/core';
import {
  cloudPlatforms,
  frameworks,
  languages,
  operatingSystems,
  skillsData,
} from './data/skills.data';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  public get cloudPlatforms() {
    return cloudPlatforms;
  }

  public get frameworks() {
    return frameworks;
  }
  public get languages() {
    return languages;
  }
  public get operatingSystems() {
    return operatingSystems;
  }
  public get skillsData() {
    return skillsData;
  }
}
