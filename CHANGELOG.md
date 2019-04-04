# Changelog
## Unreleased
### Updated
- Re-built on top of my [disharmony](https://github.com/benji7425/disharmony) framework
- Replaced separate *allow* and *disallow* commands with *set-joinable*

## v3.4.0
### Added
- Integrated role-on-join bot
    - Assign members a configured role when they join based on the invite they used
    - New commands for invite configuring
- MongoDB compatibility
- Reset command to reset data for the server
- Stats command to view a few bot statistics
- Bot name now displays in version command

### Updated
- Removed auto-restart script as shouldn't be needed anymore

### Fixed
- Errors when assigning the role will now actually be reported in Discord, rather than the user just receiving a blank mention

## v3.3.1
### Fixed
- Fixed loss of data on Discord outage

## v3.3.0
### Updated
- Updated data storage to use a NeDB database rather than a json file

### Fixed
- Fixed memory leak due to unconfigured discord.js caching

## v3.2.2
### Added
- Some additional debug.log logging to help with identifying errors
- Removal of data when bot kicked from guild

### Updated
- Route a lot of mostly irrelevant console spam to a file instead of the console
- Updated launch command to pass max-old-space-size parameter to limit memory usage

## v3.2.1
### Fixed
- Fixed commands not being recognised when invoked on android devices

## v3.2.0
### Added
- Extra responses to the user
  - Tell the user if they try to join a role they alraedy have
  - Tell the user if they try to leave a role they didn't have in the first place
- Debug logging of discord.js connection messages

### Updated
- Updated some connection code to hopefuly be a bit more stable

## v3.1.3
### Added
- Verbose logging to console when the bot is running

### Updated
- Removed "this command has been updated" message, as it's not used anymore

## v3.1.2
### Updated
- Removed "command not recognised" response, it caused 'fake' errors if multiple bots being run off the same token

## v3.1.1
### Fixed
- Fixed some incorrect old module references in the code that would have cause problems sooner or later

## v3.1.0
### Updated
- Updated error handling for Discord API errors
- Updated a few command responses
- Updated bootstrapping and command handling to use shared subrepo

## v3.0.2
### Updated
- Update kickback when old commands are used to be less spammy

## v3.0.1
### Fixed
- Fix regular users being unable to use commands

## v3.0.0
### Added
- Fancy new @bot help response

### Updated
- Back-end updates
- Join and leave role commands now invoked by @mention-ing the bot

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