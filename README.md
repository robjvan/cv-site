# Readme

## Architecture

- shared launcher service provides a way to open, close, and track which "app" is open

- each "app" has a dedicated service providing management of relevant objects (ie. a NotesService handling note objects)

- shared Storage service handles IO operations, mostly with localsessions storage

- shared Settings service handles global settings state - ie. showing seconds in the clock

## Technical

- Use of Angular signals and RXJS for dynamic UI feedback and updates

- Full JSDoc comments on class, methods, properties, and logic

- Integration of Angular CDK drag-and-drop, scrollables

- Use of timers, intervals, toast system, and audio playback

<!-- TODO(RV): Add more features, comments, etc. -->