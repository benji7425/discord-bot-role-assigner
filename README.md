# discord-role-bot

Very simple bot for adding and removing roles upon user request  
Uses [discord.io](https://github.com/izy521/discord.io)

## Setup
1. Download the latest release from the [releases page](https://github.com/benji7425/discord-role-bot/releases)
2. Unzip the file somewhere
3. Create *token.json* in the root folder; make it looks like this: `{ "token": "1234567890" }`
4. Set up the roles in *config.json* (there is an example to help)
    1. Put a comma at the end of the previous one
    2. New line
    3. In a discord chat, type `\@role` to get the role ID (make sure the role is mentionable)
    4. Add the role, looking like this: `{ "name": "myrole", "id": "1234567890" }`
5. Run `npm start`
 
## Troubleshooting

- Make sure the bot has role management permissions
- Make sure each role in *config.json* has a comma on the end, *except for the last one*
