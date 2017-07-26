# Discord role bot

Discord bot for allowing users to join and leave configured roles

## Setup

1. Clone somewhere
2. `npm install`
3. Add a file called *token.json* with your token: `{ "token": "your-token-goes-here" }`
4. `npm start`

## Configuration

### Admin commands
These require administrator permission in the guild
- `@bot allow @role` to allow users to join/leave the role
- `@bot disallow @role` to disallow users to join/leave the role

### User commands
These can be run by any user in the guild
- `!joinrole role-name` to join a role
- `!leaverole role-name` to leave a role

## Need help?

Join my [support Discord server](https://discordapp.com/invite/SSkbwSJ)
