# Discord role bot

A simple bot to allow users to join and leave certain roles

## Features

- Toggle permissions for a role on and off
- Simple command for user to join and leave permitted roles
- Confirmation message indicating successful role addition

## Invite the bot

Invite the bot to your server with [this link](https://discordapp.com/oauth2/authorize?client_id=341303774838652928&scope=bot&permissions=0x10000c00)

## Usage

### Admin commands
These require administrator permission in the guild
- `@bot allow rolename` to allow users to join/leave the role
- `@bot disallow rolename` to disallow users to join/leave the role

### User commands
These can be run by any user in the guild
- `!joinrole rolename` to join a role
- `!leaverole rolename` to leave a role

## Permissions needed

| Permission     | Reason                                                            |
|----------------|-------------------------------------------------------------------|
| Read messsages | Detect when a command is used                                     |
| Send messages  | Confirmation that the command was successful                      |
| Manage roles   | Assign and remove roles to/from a user when they use the commands |

## Setup your own instance

1. Clone somewhere
2. Make sure you have *git* installed, as this is needed for some modules
3. `npm install`
4. Add a file called *token.json* with your token: `{ "token": "your-token-goes-here" }`
5. `npm start`

## Need help?

Join my [support Discord server](https://discordapp.com/invite/SSkbwSJ)
