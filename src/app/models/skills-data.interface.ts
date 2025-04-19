import { ISkillMetric } from './skill-metric.interface';

export interface ISkillsData {
  skillsOverview: string;
  cloudPlatforms: ISkillMetric[];
  skillsData: ISkillMetric[];
  languages: ISkillMetric[];
  operatingSystems: ISkillMetric[];
  frameworks: ISkillMetric[];
}
