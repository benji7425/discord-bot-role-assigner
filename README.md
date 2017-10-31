# Discord role bot

<!--summary-->
A simple bot to allow users to join and leave certain roles
<!--/summary-->

## Features

<!--features-->
- Toggle permissions for a role on and off
- Simple command for user to join and leave permitted roles
- Confirmation message indicating successful role addition
<!--/features-->

## Invite

By inviting this bot to your server you agree to the [terms and conditions](#privacy-statement) laid out in the privacy section of this document.  
If you agree, invite to your server with [this link](https://discordapp.com/oauth2/authorize?client_id=341303774838652928&scope=bot&permissions=0x10004c00).

## Setup

**Admin only**
These require administrator permission in the guild
- `@Role_Assigner allow rolename` to allow users to join/leave the role
- `@Role_Assigner disallow rolename` to disallow users to join/leave the role

## Usage

### User commands
These can be run by any user in the guild
- `@Role_Assigner joinrole rolename` to join a role
- `@Role_Assigner leaverole rolename` to leave a role

## Permissions

The bot requires certain permissions, which you are prompted for on the invite screen.
Each permission has a reason for being required, explained below.

| Permission     | Reason                                                              |
|----------------|---------------------------------------------------------------------|
| Read messsages | Detect when a command is used                                       |
| Send messages  | Confirmation that the command was successful                        |
| Manage roles   | Assign and remove roles to/from a user when they use the commands   |
| Embed links    | Responses to 'help' requests use message embeds for nice formatting |

## Privacy statement

In accordance with the [Discord developer Terms of Service](https://discordapp.com/developers/docs/legal), by inviting this bot to your Discord server you agree that this bot may collect and store the relevant data needed to function, including but not limited to:

- Details about the server being joined (server name, server ID, server roles and permissions)  
- Details about the users in the server (usernames, nicknames and user IDs)  
- The contents of messages necessary to function (invoked commands and their parameters)  

This bot will only collect data which is necessary to function.  
No data collected will be shared with any third parties.  

Should you wish for the data stored about your server to be removed, please contact me via [my support Discord server](https://discordapp.com/invite/SSkbwSJ) and I will oblige as soon as I am able. Please note that this will require you to remove the bot from your server.

## Want to host your own instance?

1. Clone the repository, or download and extract the zip file (preferrably from the release page)
2. Make sure you have *npm* and *git* installed
3. Run `npm install`
4. Add *token.json* in the root folder: `{ "token": "your-token-goes-here" }`
5. Run `npm start`

**Note for git users**  
If you cloned the repository with git, make sure you `git reset --hard vX.Y` to a specific version, as latest master isn't always production ready!

## Need help?

I am available for contact via my [support Discord server](https://discordapp.com/invite/SSkbwSJ). I will always do my best to respond, however I am often busy so can't always be available right away, and as this is a free service I may not always be able to resolve your query.
