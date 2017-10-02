const Core = require("../../discord-bot-core");

module.exports = new Core.Command({
	name: "joinrole",
	description: "Join a permitted role",
	syntax: "joinrole <rolename>",
	admin: false,
	invoke: invoke
});

function invoke({ message, params, guildData, client }) {
	return manageRole(message.guild, guildData, message.member, params[0], true);
}