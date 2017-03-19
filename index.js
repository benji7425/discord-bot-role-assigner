//node imports
var Console = require("console");

//external library imorts
var Discord = require("discord.io");
var JsonFile = require("jsonfile");

//my imports
var Token = require(".token/json");

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
		if (userID !== DiscordClient.bot.id)
			DiscordClient.bot.sendMessage({
				to: channelID,
				message: "Message received from userID " + userID
			});
	}
};

(function () {
	DiscordClient.bootstrap();
})();