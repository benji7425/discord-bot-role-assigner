const Console = require("console");

module.exports = (config) => {
	config = config || require("./config.json");

	this.commands = [
		{
			command: config.roleAddCommand,
			type: "startsWith",
			action: (bot, user, userID, channelID, message) => {
				let roleName = message.split(" ")[1];
				let roleID = getRoleIDFromName(roleName, config.availableRoles);

				if (roleID !== null && roleID !== undefined)
					bot.addToRole({
						serverID: bot.channels[channelID].guild_id,
						userID: userID,
						roleID: roleID
					}, (err, response) => { Console.error(err + " " + response); });
				else
					Console.error(user + " tried to remove role '" + roleName + "' but this role does not exist!");
			}
		},
		{
			command: config.roleRemoveCommand,
			type: "startsWith",
			action: (bot, user, userID, channelID, message) => {
				let roleName = message.split(" ")[1];
				let roleID = getRoleIDFromName(roleName, config.availableRoles);

				if (roleID !== null && roleID !== undefined)
					bot.removeFromRole({
						serverID: bot.channels[channelID].guild_id,
						userID: userID,
						roleID: roleID
					}, (err, response) => { Console.error(err + " " + response); });
				else
					Console.error(user + " tried to remove role '" + roleName + "' but this role does not exist!");
			}
		},
		{
			command: config.roleListCommand,
			type: "equals",
			action: (bot, user, userID, channelID, message) => {
				bot.sendMessage({
					to: channelID,
					message: "Available roles: \n" + config.availableRoles.map((x) => x.name).join(", \n")
				});
			}
		}
	];

	return this;
};

var getRoleIDFromName = (roleName, availableRoles) => {
	var returnID = null;

	var normaliseRoleName = (roleName) => {
		return roleName.replace(" ", "").toLowerCase();
	};

	availableRoles.forEach((role) => {
		if (normaliseRoleName(role.name) === normaliseRoleName(roleName))
			returnID = role.id;
	});

	return returnID;
};