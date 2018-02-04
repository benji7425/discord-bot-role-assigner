const Core = require("../../core");
const Internal = require("../internal.js");

module.exports = new Core.Command({
	name: "joinrole",
	description: "Join a permitted role",
	syntax: "joinrole <rolename>",
	admin: false,
	invoke: invoke
});

function invoke({ message, params, guildData, client }) {
	if (message.member.roles.find(x => Internal.normaliseRoleName(x.name) === Internal.normaliseRoleName(params[0])))
		return Promise.reject("You already have that role!");
	return Internal.manageRole(message.guild, guildData, message.member, params[0], true);
}
