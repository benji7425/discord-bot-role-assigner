const GuildData = require("./models/guild-data.js");

module.exports = {
	onCommand(commandObj, commandsObj, params, guildData, message) {
		switch (commandObj.command) {
			case commandsObj.allowRole.command:
				return allowRole();
			case commandObj.disallowRole.command:
				return disallowRole();
			case commandObj.viewRoles.command:
				return viewRoles();
			case commandObj.joinRole.command:
				return joinRole();
			case commandObj.leaveRole.command:
				return leaveRole();
		}
	},
	onNonCommandMsg(message, guildData) {
		if (message.content.toLowerCase() === "!joinrole")
			message.reply("Command has updated, please now use @bot joinrole");
		else if (message.content.toLowerCase() === "!leaverole")
			message.reply("Command has updated, please now use @bot leaverole");
	}
};

function allowRole() {
	//todo
}

function disallowRole() {
	//todo
}

function viewRoles() {
	//todo
}

function joinRole() {
	//todo
}

function leaveRole() {
	//todo
}