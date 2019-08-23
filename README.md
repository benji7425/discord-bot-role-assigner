[![Build status](https://badge.buildkite.com/8ce0723b03f875a2dd9ba526d3b6fbc8601d1be1f56a02e94e.svg)](https://buildkite.com/benji7425/rss-fetcher)
# Discord Role Assigner
<!--summary-->
A simple Discord bot to allow users to join and leave configured roles
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

## Getting started
### Invite
- By using this bot you agree to the terms laid out in the [Privacy & Terms](./docs/privacy-and-terms) document
- If you agree, use my [public invite]() (coming soon!) to invite the bot to your server
- See the [self hosting section](#self-hosting) for details on running on your own server

### Setup
Use `@RSS Poster help` to view available commands

**Admin only**  
These command requires administrator permission in the Discord server
- `@Role Assigner set-joinable <rolename> <true/false>` to set or unset a role as joinable

### Usage
These commands can be run by any user in the Discord server
- `@Role Assigner joinrole <rolename>` to join a role
- `@Role Assigner leaverole <rolename>` to leave a role

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
### Manually
1. Install [Node.js v10](https://nodejs.org/en/)
2. Clone the repository, or download and extract the zip file (preferrably from the [release page](https://github.com/benji7425/discord-role-assigner/releases))
3. Create a new file config.json from a copy of config.sample.json; paste your bot token in the token field (between the quotes)
4. Run `npm run full-start` to compile and run the bot
    - If you see yellow 'WARN' messages about peer dependencies, you can safely ignore these

#### Git users
If you cloned the repository with git, make sure you `git reset --hard vX.Y` to a specific version, as latest master isn't always production ready!

### Docker
`docker run [OPTIONS] benji7425/discord-role-assigner`

#### Options
- To gain access to the log files  
    `-v /path/to/logs:/app/logs`
- To provide a token (for the default configuration)  
    `-e TOKEN="your-token-here"`
- To maintain a persistent copy of the local database (for the default configuration)  
    `-v /path/to/data:/app/nedb-data`
- To provide your own configuration  
    `-v /path/to/config.json:/app/config.json`

#### Notes
- **Due to limitations with volume mounting cross-OS you cannost use a Windows host with the inbuilt NeDB database**
- View the image on Docker Hub [here](https://cloud.docker.com/u/benji7425/repository/docker/benji7425/discord-role-assigner)

### Database
- Out of the box the project uses [NeDB](https://github.com/louischatriot/nedb/) as a local database, storing the data in *./nedb-data*
- Both [NeDB](https://github.com/louischatriot/nedb/) and [MongoDB](https://www.mongodb.com) are supported
- Edit the connection string in [config.json](./config.json) or by setting the *DB_STRING* environment variable

## Need help?
I am available for contact via my [support Discord server](https://discordapp.com/invite/SSkbwSJ). I will always do my best to respond, however I am often busy so can't always be available right away, and as this is a free service I may not always be able to resolve your query.

## Built With
- [Node.js](https://nodejs.org/en/) - *Runtime*
- [discord.js](https://github.com/discordjs/discord.js) - *Discord library*
- [disharmony](https://github.com/benji7425/disharmony) - *Bot framework*

## Versioning
[SemVer](http://semver.org/) is used for versioning; view available versions on the [tags page](https://github.com/your/project/tags)

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details