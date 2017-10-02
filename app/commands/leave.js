const Core = require("../../discord-bot-core");

module.exports = new Core.Command({
	name: "leaverole",
	description: "Leave a permitted role",
	syntax: "leaverole <rolename>",
	admin: false,
	invoke: invoke
});

function invoke({ message, params, guildData, client }) {
	return manageRole(message.guild, guildData, message.member, params[0], false);
}