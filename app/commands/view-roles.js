const Core = require("../../core");

module.exports = new Core.Command({
	name: "view-roles",
	description: "View all the roles users are allowed to add via the bot",
	syntax: "view-roles",
	admin: true,
	invoke: invoke
});

function invoke({ message, params, guildData, client }) {
	return Promise.resolve(guildData.allowedRoles.join(", "));
}