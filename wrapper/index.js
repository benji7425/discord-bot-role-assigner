//node imports
const Console = require("console");

//external module imports
var Discord = require("discord.io");

var BotModules = [];

var bot;

var EventHandlers = {
	onReady: () => {
		Console.info("Registered bot " + bot.username + " with id " + bot.id);

		for (let i = 0, len = BotModules.length; i < len; i++) {
			let botModule = BotModules[i];
			if (botModule.onReady) botModule.onReady(bot);
		}
	},
	onDisconnect: (err, code) => {
		Console.error("Bot was disconnected!", err, code);

		for (let i = 0, len = BotModules.length; i < len; i++) {
			let botModule = BotModules[i];
			if (botModule.onDisconnect) botModule.onDisconnect();
		}

		bot.connect();
	},
	onMessage: (user, userID, channelID, message) => {
		for (let i = 0, iLen = BotModules.length; i < iLen; i++) {
			let botModule = BotModules[i];

			if (botModule.commands) {
				for (let j = 0, jLen = botModule.commands.length; j < jLen; j++) {
					let messageTrigger = botModule.commands[j];

					if (commandIsAllowed(messageTrigger, user, userID, channelID))
						switch (messageTrigger.type) {
							case "startsWith":
								if (message.startsWith(messageTrigger.command))
									messageTrigger.action(bot, user, userID, channelID, message);
								break;
							default:
								if (message === messageTrigger.command)
									messageTrigger.action(bot, user, userID, channelID, message);
						}
				}
			}

			if (botModule.onMessage) botModule.onMessage(bot, user, userID, channelID, message);
		}
	}
};

var commandIsAllowed = (messageTrigger, user, userID, channelID) => {
	//if we aren't allowed this command in this channel, disallow the command
	if (messageTrigger.channelIDs && !messageTrigger.channelIDs.includes(channelID))
		return false;

	if (messageTrigger.roleIDs) { //check if we have a role constraint
		var userHasPermissiveRole = false;

		messageTrigger.roleIDs.forEach((element) => { //iterate over all the allowed role IDs
			if (userHasRole(userID, channelID, element)) userHasPermissiveRole = true; //check if the user has this role
		});

		if (!userHasPermissiveRole) return false; //disallow the command if the user doesn't have one of these role IDs
	}

	//if this user isn't allowed, disallow the command
	if (messageTrigger.userIDs && !messageTrigger.userIDs.includes(userID))
		return false;

	//if we haven't returned false by now, then the command is allowed
	return true;
};

var userHasRole = (userID, channelID, roleID) => {
	var userRoles = bot.servers[bot.channels[channelID].guild_id].members[userID].roles;
	return userRoles.includes(roleID);
};

(() => {
	bot = new Discord.Client({
		token: require("./token.json").token,
		autorun: true
	});

	bot.on("ready", EventHandlers.onReady);
	bot.on("disconnect", EventHandlers.onDisconnect);
	bot.on("message", EventHandlers.onMessage);
})();