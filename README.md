# Readme

- shared launcher service provides a way to open, close, and track which "app" is open

- use of an enum to dictate dialog purpose for opening/closing

- each "app" has a dedicated service providing management of relevant objects (ie. a NotesService handling note objects)

- shared storage service handles IO operations, mostly with localsessions storage

- shared settings service handles global settings state - ie. showing seconds in the clock, dark mode (if implemented, undecided)
<!-- TODO(RV): Decide about dark mode and update this entry -->

<!-- TODO(RV): Add more features, comments, etc. -->