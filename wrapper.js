const Discord = require("discord.js");
const DiscordUtil = require("discordjs-util");

const client = new Discord.Client();

process.on("uncaughtException", (err) => {
	DiscordUtil.dateError(err);
});

client.login(require("./token.json").token);

client.on("ready", () => {
	require("./app/index.js")(client);
});

client.on("disconnect", eventData => {
	DiscordUtil.dateError(eventData.code, eventData.reason);
});
