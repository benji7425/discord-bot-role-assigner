const Core = require("../../discord-bot-core");
const Internal = require("../internal.js");

module.exports = new Core.Command({
	name: "joinrole",
	description: "Join a permitted role",
	syntax: "joinrole <rolename>",
	admin: false,
	invoke: invoke
});

function invoke({ message, params, guildData, client }) {
	return Internal.manageRole(message.guild, guildData, message.member, params[0], true);
}