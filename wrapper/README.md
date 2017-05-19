# Shell Discord bot

The purpose of this is to act as a shell for other bot modules, so that a single bot user account can be used for a multi-function bot.

## Usage

### As a project base
- Fork/clone/merge this repo into a new one
- Run `npm init` to re-initialise as the new repo
- Run `npm install`
- Create *token.json* with your discord token: `{ "token": "1234567890" }`
- Add your modules and reference them in `var BotModules = [];`  
	for example: `var BotModules = [require("my-module")];`

### As a wrapper
- Use [git subrepo](https://github.com/ingydotnet/git-subrepo) to clone this into a folder called *wrapper* in your parent project
- Update your parent project's `start` script to run `node wrapper/index.js`
- Add a reference to your parent project's main file in `var BotModules = [];`  
	for example: `var BotModules = [require("../app/index.js")];`

## Creating a bot module

Interfacing with each bot module is done by the properties in its module.exports. Available properties are:

| property     | property type | parameters                            | description                                                                                                                          |
|--------------|---------------|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| onReady      | method        | bot                                   | called on the bot ready event                                                                                                        |
| onDisconnect | method        | none                                  | called when the bot disconnects                                                                                                      |
| onMessage    | method        | bot, user, userID, channelID, message | called when the bot receives a message - identical to the 'action' property of a command, but triggered on every message (see below) |
| commands     | array         | N/A                                   | commands a user can invoke - like the onMessage event, but only triggered on expected commands (see below)                           |

### Commands

A command object contains a command, and an action to invoke if the message contains that command. Each command object needs a certain set of properties:


| property   | optional? | value                    | description                                                                                               |
|------------|-----------|--------------------------|-----------------------------------------------------------------------------------------------------------|
| command    | required  | string                   | Command to look for in the message                                                                        |
| type       | required  | "equals" or "startsWith" | Describes whether we are looking for the message to be the exact command, or just to start with it        |
| action     | required  | function                 | Callback to invoke if the command is matched (see below)                                                  |
| channelIDs | optional  | array of strings         | If this property is present, the command will only be triggered if sent in one of these channels          |
| roleIDs    | optional  | array of strings         | If this property is present, the command will only be triggered if send by a user with one of these roles |
| userIDs    | optional  | array of strings         | If this property is present, the command will only be triggered if sent by one of these users             |

**Permission heirarchy**
channelIDs > roleIDs > userIDs  

Examples of commands that *won't* be triggered:
- channelIDs *contains* the channel, but userIDs *doesn't* - channelID check will pass, userID check subsequently won't
- channelIDs *doesn't contain* the channel, roleIDs or userIDs *contain* the user - channelID check will block the command, regardless of other permissions
- channelIDs *contains* the channel, roleIDs *doesn't* contain the user's roles, userIDs *contains* the user - channelID check will pass, roleID check will block


#### Actions

An action is a callback function called if the specified command is found. It must take these parameters:

| parameter | type   | description                                                          |
|-----------|--------|----------------------------------------------------------------------|
| bot       | object | The [discord.io](https://github.com/izy521/discord.io) client object |
| user      | string | Username of the user who sent the message                            |
| userID    | string | User ID of the user who sent the message                             |
| channelID | string | Channel ID of the channel the message was sent in                    |
| message   | string | The message/command that was sent                                    |

Example 1:

```JavaScript
{
	command: "ping",
	type: "equals",
	action: (bot, user, userID, channelID, message) => {
		bot.sendMessage({
			to: channelID,
			message: "pong"
		})
	},
	userIDs: ["1234567890"]
}
```

The above example will only call *action* if the user with ID 1234567890 sends "ping"

Example 2:

```JavaScript
{
	command: "!define",
	type: "startsWith",
	action: (bot, user, userID, channelID, message) => {
		bot.sendMessage({
			to: channelID,
			message: getDefinition(message.split(" ")[1])
		})
	}
}
```

The above example expects the user to type '!define something', ie only checking for the message to start with '!define'. You are still passed the full message, so can split it up and read it however you want.
*action* will only be called if the message begins with '!define', but has no restrictions on which channel(s) or user(s) use it
