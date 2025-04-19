import { ISkillMetric } from '../../models/skill-metric.interface';

// export const skillOverview = `
// I bring a diverse skill set spanning full-stack development, embedded systems, and mobile innovation.
// On the frontend, I work with Flutter, Angular, Bootstrap, and responsive web technologies.
// My backend experience includes NestJS, Express, PostgreSQL, and MongoDB, with secure APIs using JWT and OAuth.

// I’m proficient with state management tools like Redux (including Redux Thunk) and Provider for Flutter.
// My work integrates multiple external APIs such as Google Books, Stripe, OpenAI, and Firebase for rich, real-world functionality.

// I’ve built production-grade microservices, deployed backend stacks to AWS, and worked with cloud DBs like Firebase and MongoDB Atlas.
// Additionally, I have hands-on experience with sensor circuit design, hardware integration using Cypress PSoC kits, and analog signal processing for real-time data capture.

// Other skills include unit testing, Git workflows, 3D modeling, barcode scanning, camera-based input, and cross-platform deployment.
// I’m equally comfortable in Windows, macOS, and Linux environments.
// `;

export const skillsOverview = `
I bring a broad, practical skill set in full-stack and mobile development, with a strong foundation in support, diagnostics, and embedded integration.

On the frontend, I work confidently with Flutter, Angular, Bootstrap, and responsive UI frameworks. 
On the backend, I’ve built secure REST APIs using NestJS, Node.js, PostgreSQL, and MongoDB, often integrating third-party services like Stripe, OpenAI, and Firebase.

I have used Redux (and Thunk) for state management in both mobile and web contexts. 
My projects include a Flutter-based e-commerce app with cloud backend, a barcode/ISBN scanning app using the Google Books API, and a 3D printing service built on microservices.

I've also worked on foundational electronics projects using Cypress PSoC and Arduino platforms — interfacing with sensors, LCDs, and ADCs to capture and display real-world data.

Other skills include Git workflows, 3D modeling, barcode scanning, camera-based input, and cross-platform deployment. 
I’m equally comfortable in Windows, macOS, and Linux environments.
`;

export const skillsData: ISkillMetric[] = [
  { title: 'Back end development', value: 9 },
  { title: 'Front end development', value: 8 },
  { title: 'Databases (SQL/NoSQL)', value: 7 },
  { title: 'Embedded Systems & Sensor Integration', value: 5 },
  { title: 'Hardware Repair', value: 9 },
  { title: 'Server Administration', value: 6 },
  { title: 'Technical Support/Repair', value: 9 },
  { title: 'Technical Writing', value: 7 },
  { title: '3D Modeling', value: 6 },
  { title: 'API Design & Integration', value: 8 },
];

export const frameworks: ISkillMetric[] = [
  { title: 'Angular 2+', value: 6 },
  { title: 'Angular Material', value: 5 },
  { title: 'Bootstrap', value: 8 },
  { title: 'Flutter', value: 9 },
  { title: 'NestJS', value: 8 },
  { title: 'Svelte', value: 2 },
];

export const languages: ISkillMetric[] = [
  { title: 'Dart', value: 7 },
  { title: 'Typescript', value: 8 },
  { title: 'JavaScript', value: 7 },
  { title: 'Python', value: 3 },
  { title: 'C#', value: 2 },
  { title: 'CSS', value: 7 },
  { title: 'SQL', value: 6 },
];

export const cloudPlatforms: ISkillMetric[] = [
  { title: 'AWS', value: 2 }, // Based on deployment experience via NestJS
  // { title: 'Azure', value: 0 },
  { title: 'ChatGPT', value: 7 },
  { title: 'Git', value: 7 },
  { title: 'Google Cloud/Firebase', value: 6 },
];

export const operatingSystems: ISkillMetric[] = [
  { title: 'Windows', value: 9 },
  { title: 'Mac OS', value: 8 },
  { title: 'Linux', value: 6 },
];

// Core Skills
// Frontend Development: Flutter, Angular, Bootstrap, HTML5/CSS3, JavaScript (ES6), Responsive Design
// Backend Development: NestJS, Node.js, Express, RESTful APIs, PostgreSQL, MongoDB, Strapi, JWT authentication
// State Management: Redux, Redux Thunk, Provider (Flutter)
// API Integration: Google Books API, OpenAI, Stripe, Firebase Cloud Functions, and custom Express/NestJS microservices
// Authentication & Security: JWT, OAuth, Firebase Auth, secure storage, and authorization guards
// Tooling & DevOps: Git, GitHub, Postman, CLI tools, Firebase, MongoDB Atlas, AWS (EC2, S3), pgAdmin
// Software Architecture: Microservices, MVC pattern, async workflows, DTOs, schema modeling, unit testing
// Embedded & Electronics (Basic Experience): Completed hands-on projects using Cypress PSoC and Arduino involving temperature, rotary, and flow sensors, analog input, and LCD displays
// Other Technical Skills: 3D modeling, technical documentation, hardware diagnostics, barcode scanning, and camera-based input
// Operating Systems: Windows, macOS, Linux
