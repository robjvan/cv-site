# Readme

Welcome to my portfolio!  I’m a passionate Full Stack Developer specializing in creating robust web and mobile applications along with innovative user experiences. This site is a showcase of my skills, projects, and the journey I’ve taken as a developer.

_Note: This is an ongoing project!  Some things may not look or work quite right, but fixes are always on the way._
<br>
<p style="text-align: center;">
<img src="https://cv-site-458500.nn.r.appspot.com/images/thumbnails/site-thumbnail.png" width="1000">
</p>

<p style="text-align: center; font-style: italic;">
Available at <a href="https://robjvan.ca"> https://robjvan.ca </a>
</p>

### Architecture

- Built with Angular 19 and deployed to Google App Engine

- Shared launcher service provides a way to open, close, and track which "app" is open

- Shared Settings service handles global settings state - ie. showing seconds in the clock

- Each "app" has a dedicated service providing management of relevant objects (ie. a NotesService handling note objects)

- Localized weather conditions based on user's public IP

- Links to download my CV and generate a downloadble skills summary

- Utilizes a private weather server to avoid exposing private keys, only user lat/lon are submitted

### Technical

- Use of Angular signals and RxJS for dynamic UI feedback and updates

- Full JSDoc comments on classes, methods, properties, and logic

- Integration of Angular CDK drag-and-drop, scrollables

- Use of timers, intervals, toast system, and audio playback

- Utilizes Vanta.js for dynamic background

<!-- TODO(RV): Add more features, comments, etc. -->