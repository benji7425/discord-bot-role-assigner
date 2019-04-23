# Discord Role Assigner
<!--summary-->
A simple bot to allow users to join and leave configured roles
<!--/summary-->

## Features
<!--features-->
- Toggle permissions for a role on and off
- Simple command allows user to join and leave permitted roles
<!--/features-->

## Use cases
- You want certain roles to be opt-in, but don't want to have to manually assign users  
- Opt-in channels accessible by a joinable role
- Opt-in role ping notifications accessible by a joinable role

## Examples
- A content creator fan server might provide `joinrole video-notificatons` and then ping @video-notifications when a new video goes up
- An multi-language server might use localised channels, providing `joinrole español` etc to access your language

## Getting started
### Invite
- By using this bot you agree to the terms laid out in the [Privacy & Terms](./docs/privacy-and-terms) document
- If you agree, use my [public invite]() (coming soon!) to invite the bot to your server

### Setup
**Admin only**  
These commands require administrator permission in the Discord server
- `@Role Assigner set-joinable rolename true/false` to set or unset a role as joinable

### Usage
These commands can be run by any user in the Discord server
- `@Role Assigner joinrole rolename` to join a role
- `@Role Assigner leaverole rolename` to leave a role

### Permissions
The bot requires certain permissions, which you are prompted for on the invite screen.
Each permission has a reason for being required, explained below.

| Permission     | Reason                                                              |
|----------------|---------------------------------------------------------------------|
| Read messsages | Detect when a command is used                                       |
| Send messages  | Confirmation that the command was successful                        |
| Manage roles   | Assign and remove roles to/from a user when they use the commands   |
| Embed links    | Responses to 'help' requests use message embeds for nice formatting |
| Manage server  | Read server invites for role assigning when user joins with invite  |

## Self hosting
1. Clone the repository, or download and extract the zip file (preferrably from the release page)
2. Make sure you have *npm* and *git* installed
3. Run `npm install`
4. Run `npm run build`
5. Add a file named *token* in the root folder with your token string in
6. Run `npm start`

**Note for git users**  
If you cloned the repository with git, make sure you `git reset --hard vX.Y` to a specific version, as latest master isn't always production ready!

## Need help?

I am available for contact via my [support Discord server](https://discordapp.com/invite/SSkbwSJ). I will always do my best to respond, however I am often busy so can't always be available right away, and as this is a free service I may not always be able to resolve your query.

## Built With
- [discord.js](https://github.com/discordjs/discord.js) - *Discord library*
- [disharmony](https://github.com/benji7425/disharmony) - *Bot framework*

## Versioning
[SemVer](http://semver.org/) is used for versioning; view available versions on the [tags page](https://github.com/your/project/tags)

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details