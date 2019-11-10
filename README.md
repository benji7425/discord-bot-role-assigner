[![Build status](https://badge.buildkite.com/8ce0723b03f875a2dd9ba526d3b6fbc8601d1be1f56a02e94e.svg)](https://buildkite.com/benji7425/rss-fetcher)

# Discord Role Assigner
A simple Discord bot to allow users to join and leave configured roles.

## Features
- Toggle permissions for a role on and off
- Simple command allows user to join and leave permitted roles

## Use cases
- You want certain roles to be opt-in, but don't want to have to manually assign users  
- Opt-in channels accessible by a joinable role
- Opt-in role ping notifications accessible by a joinable role

## Getting started
Role Assigner needs to be deployed before you can invite it to your Discord server. Please see [my written deployment guide](https://benji7425.io/discord-deployment) or [video tutorial](https://www.youtube.com/watch?v=DjQayKgcjGM) which can guide you through deployment even if you are a beginner.  
Once you have deployed Role Assigner then return here to follow the Discord setup instructions below.  

This button can be used for following the Heroku deployment steps.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/benji7425/discord-role-assigner)

## Discord Setup
Follow these instructions once you have deployed the Role Assigner and added it to your Discord server.
Use `@RSS Poster help` to view available commands.

**Admin only**  
These command requires administrator permission in the Discord server.
- `@Role Assigner set-joinable <rolename> <true/false>` to set or unset a role as joinable

### Usage
These commands can be run by any user in the Discord server.
- `@Role Assigner joinrole <rolename>` to join a role
- `@Role Assigner leaverole <rolename>` to leave a role

## Permissions
The bot requires certain permissions, which you are prompted for on the invite screen.
Each permission has a reason for being required, explained below.

| Permission     | Reason                                                              |
|----------------|---------------------------------------------------------------------|
| Read messsages | Detect when a command is used                                       |
| Send messages  | Confirmation that the command was successful                        |
| Manage roles   | Assign and remove roles to/from a user when they use the commands   |
| Embed links    | Responses to 'help' requests use message embeds for nice formatting |
| Manage server  | Read server invites for role assigning when user joins with invite  |

## Troubleshooting

- Test Role Assigner's ability to reply by using the version command `@Role Assigner version`
- Double check that Role Assigner has both *read* and *write* permissions in the channel you're using
- Make sure you're actually mentioning the bot and *not the role with the same name*
- Make sure you have the 'Administrator' permission if you're trying to use an admin command
- Double check that you've given Role Assigner all the necessary [permissions](#permissions)
- Make sure that the 'Role Assigner' role is higher in the server role hierarchy than the roles you want it to manage

## Built With
- [Node.js](https://nodejs.org/en/) - *Runtime*
- [discord.js](https://github.com/discordjs/discord.js) - *Discord library*
- [disharmony](https://github.com/benji7425/disharmony) - *Bot framework*

## Versioning
[SemVer](http://semver.org/) is used for versioning; view available versions on the [tags page](https://github.com/your/project/tags).

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.