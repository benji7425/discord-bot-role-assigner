# Changelog
## v4.1.2
### Updated
- Package version for disharmony

### Removed
- Dead links in help command

## v4.1.1
### Updated
- Package versions for typescript and disharmony

## v4.1.0
### Added
- Script `monitor.js` to restart the bot daily (usage optional)
- Commands `import` and `export` for server data transfer
- Config option to set bot 'playing' status

### Fixed
- Non-existent roles not being disallowable

## v4.0.1
### Fixed
- Join and leave commands not using case-insensitive matching
- Join and leave commands not warning the user if they already have/lack the target role

## v4.0.0
Version 4.0 is a complete re-write of the bot using TypeScript and built on top of my [disharmony library](https://github.com/benji7425/disharmony).
This changelog entry does not assume knowledge of v3.5 or prior, and so list additions as if this is a new project.

### Added
- Integration with [disharmony](https://github.com/benji7425/disharmony)
- Command *set-joinable* to configure (or unconfigure) a role as joinable
- Commands *join* and *leave* to join/leave a configured role
- Command *configure-invite* to configure an invite to assign a role on server join
- Commands *view-roles* and *view-invites* to view configured roles/invites
