//node imports
var Console = require("console");

//external library imorts
var Discord = require("discord.io");

//my imports
var Token = require("./token.json");
var Config = require("./config.json");

var DiscordClient = {
	bot: null,
	bootstrap: () => {
		DiscordClient.bot = new Discord.Client({
			token: Token.token,
			autorun: true
		});

		DiscordClient.bot.on("ready", DiscordClient.onReady);
		DiscordClient.bot.on("message", DiscordClient.onMessage);
		DiscordClient.bot.on("disconnect", (msg, code) => {
			Console.error("Error code " + code + " " + msg);
			DiscordClient.bot.connect();
		});
	},
	onReady: () => {
		Console.info("Registered bot " + DiscordClient.bot.username + " with id " + DiscordClient.bot.id);
	},
	onMessage: (user, userID, channelID, message) => {
		if (message.startsWith(Config.roleAddCommand)) {
			let roleName = message.split(" ")[1];
			Config.availableRoles.forEach((role) => {
				if (role.name === roleName) {
					DiscordClient.bot.addToRole({
						serverID: DiscordClient.bot.channels[channelID].guild_id,
						userID: userID,
						roleID: role.id
					}), (err, response) => { Console.error(err + " " + response); };
				}
			});
		}
		else if (message.startsWith(Config.roleRemoveCommand)) {
			let roleName = message.split(" ")[1];
			Config.availableRoles.forEach((role) => {
				if (role.name === roleName) {
					DiscordClient.bot.removeFromRole({
						serverID: DiscordClient.bot.channels[channelID].guild_id,
						userID: userID,
						roleID: role.id
					}), (err, response) => { Console.error(err + " " + response); };
				}
			});
		}
	}
};

(function () {
	DiscordClient.bootstrap();
})();