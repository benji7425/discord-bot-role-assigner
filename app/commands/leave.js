const Core = require("../../discord-bot-core");
const Internal = require("../internal.js");

module.exports = new Core.Command({
	name: "leaverole",
	description: "Leave a permitted role",
	syntax: "leaverole <rolename>",
	admin: false,
	invoke: invoke
});

function invoke({ message, params, guildData, client }) {
	if (!message.member.roles.find(x => Internal.normaliseRoleName(x.name) === Internal.normaliseRoleName(params[0])))
		return Promise.reject("You did not have this role in the first place!");
	return Internal.manageRole(message.guild, guildData, message.member, params[0], false);
}