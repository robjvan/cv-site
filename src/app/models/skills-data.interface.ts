import { ISkillMetric } from './skill-metric.interface';

/**
 * Represents grouped skill data used in visual charts, dashboards, or PDF exports.
 */
export interface ISkillsData {
  /**
   * Overview or summary paragraph describing the user's skill profile.
   * Example: "Full-stack developer with experience in Angular, Node.js, and cloud platforms."
   */
  skillsOverview: string;

  /**
   * List of cloud platforms the creator has worked with.
   * Example entries: AWS, Google Cloud, Azure
   */
  cloudPlatforms: ISkillMetric[];

  /**
   * Core technical or general-purpose skills.
   * Example entries: Problem Solving, Debugging, CI/CD
   */
  skillsData: ISkillMetric[];

  /**
   * Programming languages the creator is proficient in.
   * Example entries: TypeScript, Python, Go
   */
  languages: ISkillMetric[];

  /**
   * Operating systems the creator is comfortable developing or deploying on.
   * Example entries: Windows, macOS, Linux
   */
  operatingSystems: ISkillMetric[];

  /**
   * Frameworks or libraries commonly used by the creator.
   * Example entries: Angular, NestJS, Flutter
   */
  frameworks: ISkillMetric[];
}
