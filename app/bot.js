const GuildData = require("./models/guild-data.js");

module.exports = {
	onCommand(commandObj, commandsObj, params, guildData, message) {
		switch (commandObj.command) {
			case commandsObj.commandName.command:
				return; //return promise!
		}
	},
	onNonCommandMsg(message, guildData) {
		return;
	}
};