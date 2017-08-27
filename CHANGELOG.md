# Changelog

## v2.1.0

### Updated

- Add default DM response
- Make save file configurable to allow use as a module with other bots
- Update config file structure

## v2.0.3

### Fixed

- Fix bot not recognising commands if it's been nicknamed

## v2.0.2

### Added

- Added ability to pass in configuration object on startup

## v2.0.1

### Fixed
- Fix exception when no second parameter within command

## v2.0.0

### Added

- Support for roles being deleted and re-created
- Support for roles with spaces and/or caps
- Multi-guild support
- Response messages in chat upon role joining/leaving
- "Playing" indicator with my website url

### Updated

- Now uses discord.js rather than discord.io
- Setup is now done via in-chat commands, rather than config file editing

## v1.1.1

### Fixed

- Crash when someone uses the role add and leave commands without specifying a role name

## v1.1.0

### Added

- Confirmation message when a role is added/removed
	- Fully configurable in config file
	- Deletes the confirmation message after a configurable length of time
- Command aliases for role addition and removal

## v1.0.0

### Features

- Assign a role to a user when they invoke a command
- Remove a role from a user when they invoke a command
- Configure available roles to be assigned/removed
- Case insensitive role name in command
