const Discord = require("discord.js");
const DiscordUtil = require("discordjs-util");

const client = new Discord.Client();

process.on("uncaughtException", (err) => {
	DiscordUtil.dateError("Uncaught exception!", err);
});

client.login(require("./token.json").token);

client.on("ready", () => {
	DiscordUtil.dateLog("Registered bot " + client.user.username);
	require("./app/index.js")(client);
	client.user.setGame("benji7425.github.io");
});

client.on("disconnect", eventData => {
	DiscordUtil.dateError("Bot was disconnected!", eventData.code, eventData.reason);
});