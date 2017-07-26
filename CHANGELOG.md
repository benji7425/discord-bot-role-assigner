# Changelog

## v2.0.0

### Updated

- Now uses discord.js rather than discord.io
- Setup is now done via in-chat commands, rather than config file editing

### Added

- Multi-guild support

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