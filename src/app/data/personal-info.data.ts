import { IEducationEvent } from '../models/education-event.interface';
import { ISkillMetric } from '../models/skill-metric.interface';
import { IProjectData } from '../models/project-data.interface';

export const educationEvents: IEducationEvent[] = [
  // {
  //   title: undefined,
  //   date: 'June 2002',
  //   institution: 'W.P. Wagner School of Science & Technology',
  //   location: 'Edmonton, AB',
  //   description: '',
  //   comments: '',
  // },
  // {
  //   title: 'GED',
  //   date: 'unknown',
  //   institution: 'Independent Learning Center',
  //   location: 'Toronto, ON',
  //   description: '',
  //   comments: '',
  // },
  {
    title: 'Diploma - 3D Animation',
    date: '2010',
    institution: 'CD-ED DArTT (Digital Arts & Technology Training Institute)',
    location: 'Calgary, AB',
    description: '',
    comments: '',
  },
  {
    title: 'Diploma - PC Maintenance & Repair',
    date: '2011',
    institution: 'CD-ED DArTT (Digital Arts & Technology Training Institute)',
    location: 'Calgary, AB',
    description: '',
    comments: '',
  },
  {
    title: 'Certificate - ITIL v3 Foundations',
    date: '2013',
    institution: 'CD-ED DArTT (Digital Arts & Technology Training Institute)',
    location: 'Calgary, AB',
    description: '',
    comments: '',
  },
  {
    title: 'Certificate - Complete 2021 Flutter Development Bootcamp',
    date: '2021',
    institution: 'Udemy',
    location: 'GFW, Newfoundland',
    description:
      'Earned practical experience building cross-platform iOS and Android apps using Flutter and Dart. Developed over 15 real-world applications—including clones of WhatsApp, QuizUp, and Yahoo Weather—while mastering Flutter fundamentals, state management, UI/UX design, Firebase integration, and API networking. Built a strong portfolio demonstrating proficiency in widget architecture, animations, and reactive app development. Completed over 28 hours of project-based learning.',
    comments: '',
  },
  {
    title: 'Certificate - NestJS Modern Backend Development',
    date: '2022',
    institution: 'Udemy',
    location: 'GFW, Newfoundland',
    description:
      'Gained practical experience architecting and deploying scalable, secure RESTful APIs using NestJS. Built real-world backend features including user authentication (JWT), authorization guards, CRUD operations, and data persistence with PostgreSQL and MongoDB using TypeORM. Learned advanced patterns like DTOs, guards, pipes, and middleware. Covered cloud deployment via AWS, secure data handling, configuration management, and unit testing. Developed clean, maintainable code while leveraging the Nest CLI, Postman, and pgAdmin for API and DB workflows.',
    comments: '',
  },
  {
    title: 'Certificate - Complete Web Development Bootcamp',
    date: '2022',
    institution: 'Udemy',
    location: 'GFW, Newfoundland',
    description:
      'Completed an intensive 62-hour full-stack web development bootcamp covering modern front-end and back-end technologies. Gained hands-on experience building 32+ real-world projects using HTML5, CSS3, JavaScript (ES6), Node.js, Express, PostgreSQL, Git/GitHub, APIs, React, and authentication strategies. Developed a deep understanding of responsive design, version control, MVC architecture, RESTful routing, and modern deployment practices. This course equipped me with the full stack skill set to design, build, and deploy dynamic web applications from scratch.',
    comments: '',
  },
  {
    title: 'Certificate - Sensors & Sensor Circuit Design',
    date: '2022',
    institution: 'Coursera/University of Colorado Boulder',
    location: 'GFW, Newfoundland',
    description: '',
    comments: '',
  },
  {
    title: 'Certificate - Mobile E-Commerce with Flutter',
    date: '2023',
    institution: 'Udemy',
    location: 'GFW, Newfoundland',
    description:
      'Designed and developed a complete mobile e-commerce application using Flutter, Redux, and Strapi. Gained end-to-end experience with cart management, user authentication, and Stripe-powered checkout. Implemented global state handling with Redux and Redux Thunk, created custom APIs via Strapi, and managed data with MongoDB Atlas. Learned advanced Flutter UI design with Material widgets, shared theming, navigation, form handling, and persistent storage using SharedPreferences. Strengthened skills in full-stack mobile app architecture and secure client-server communication with JWT-based auth and async RESTful APIs.',
    comments: '',
  },
  {
    title:
      'Certificate - Angular, The Complete Guide; Certificate - NestJS Ultimate Masterclass',
    date: 'In Progress',
    institution: 'Udemy',
    location: 'GFW, Newfoundland',
    description: '',
    comments: '',
  },
];

export const projectsData: IProjectData[] = [
  {
    title: 'uPrint3D',
    description:
      'A full-stack, automated 3D printing platform where users select printable objects via a sleek e-commerce-style catalogue. On the backend, the system intelligently assigns print jobs to compatible machines and initiates printing autonomously.',
    stack: 'Angular, NestJS, PostgreSQL, Klipper, websockets',
    thumbnails: ['assets/images/projects/project1.png'],
    link: 'https://example.com/project1',
  },
  {
    title: 'RecipesAI',
    description:
      'A next-generation recipe platform combining web development with AI innovation. Users request new, personalized recipes, and the system dynamically generates both original recipes and images via OpenAI APIs, instantly updating their collection.',
    stack: 'Angular, NestJS, PostgreSQL, Flutter, OpenAI API, Firebase',
    thumbnails: ['assets/images/projects/project2.png'],
    link: 'https://example.com/project2',
  },
  {
    title: 'Forecast',
    description:
      'A Flutter-based weather app delivering dynamic, visually rich forecasts. Users can manage multiple locations, each with live background themes reflecting real-time weather conditions, and seamlessly switch between light and dark modes.',
    stack: 'Flutter, Redux, Weather.com API, Google Places API, SQLite',
    thumbnails: ['assets/images/projects/project3.png'],
    link: 'https://example.com/project3',
  },
  {
    title: 'Catalogify (Librarian)',
    description:
      'A streamlined book cataloguing platform designed for ease of use. Users scan ISBNs to instantly populate their personal library with cover images and metadata, while organizing collections by reading status, favorites, and wishlist categories.',
    stack: 'Flutter, NestJS, PostgreSQL, Google Books API',
    thumbnails: ['assets/images/projects/project4.png'],
    link: 'https://example.com/project4',
  },
];

export const skillsOverview = `
I bring a broad, practical skill set in full-stack and mobile development, with a strong foundation in support, diagnostics, and embedded integration.

On the frontend, I work confidently with Flutter, Angular, Bootstrap, and responsive UI frameworks. 
On the backend, I’ve built secure REST APIs using NestJS, Node.js, PostgreSQL, and MongoDB, often integrating third-party services like Stripe, OpenAI, and Firebase.

I have used reactive state handling using service-based patterns (RxJS, Provider, Signals) in both mobile and web contexts. 
My projects include a Flutter-based e-commerce app with cloud backend, a barcode/ISBN scanning app using the Google Books API, and a 3D printing service built on microservices.

I've also worked on foundational electronics projects using Cypress PSoC and Arduino platforms — interfacing with sensors, LCDs, and ADCs to capture and display real-world data.

Other skills include Git workflows, 3D modeling, barcode scanning, camera-based input, and cross-platform deployment. 
I’m equally comfortable in Windows, macOS, and Linux environments.
`;

export const skillsData: ISkillMetric[] = [
  { title: 'Back end development', value: 8 },
  { title: 'Front end development', value: 8 },
  { title: 'Mobile development (Flutter)', value: 9 },
  { title: 'API Design & Integration', value: 8 },
  { title: 'RESTful API Development', value: 8 },
  // { title: 'State Management (Redux, Thunk)', value: 7 },
  { title: 'Database Development', value: 6 },
  { title: 'Version Control ', value: 7 },
  { title: 'Secure API Development', value: 6 },
  { title: 'Microservices Architecture', value: 6 },
  { title: 'Manual Feature Testing', value: 5 },
  // { title: 'Embedded Systems & Sensor Integration', value: 5 },
  // { title: 'Server Administration', value: 5 },
  // { title: 'Hardware Repair & Diagnostics', value: 9 },
  { title: 'Technical Support/Repair', value: 9 },
  // { title: 'Technical Documentation', value: 6 },
  // { title: '3D Modeling', value: 7 },
];

export const frameworks: ISkillMetric[] = [
  { title: 'Flutter', value: 9 },
  { title: 'NestJS', value: 8 },
  { title: 'Angular 2+', value: 6 },
  { title: 'Bootstrap', value: 8 },
  { title: 'Angular Material', value: 5 },
  { title: 'Strapi', value: 4 },
  { title: 'Svelte', value: 2 },
];

export const languages: ISkillMetric[] = [
  { title: 'TypeScript', value: 8 },
  { title: 'JavaScript (ES6+)', value: 7 },
  { title: 'Dart', value: 7 },
  { title: 'SQL (PostgreSQL)', value: 6 },
  { title: 'CSS3', value: 7 },
  { title: 'Python (Beginner)', value: 3 },
  { title: 'C# (Basic)', value: 2 },
];

export const cloudPlatforms: ISkillMetric[] = [
  { title: 'Google Cloud/Firebase', value: 6 },
  { title: 'AWS (EC2, S3 Basics)', value: 3 }, // Lowered slightly to reflect limited use.
  { title: 'OpenAI API/ChatGPT Integration', value: 7 },
  { title: 'GitHub/Bitbucket', value: 7 },
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
// Other Technical Skills: 3D modeling, technical documentation, hardware diagnostics, barcode scanning, and camera-based input
// Operating Systems: Windows, macOS, Linux
