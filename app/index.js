const Console = require("console");

module.exports = (config) => {
	config = config || require("./config.json");

	this.onMessage = (bot, user, userID, channelID, message) => {
		if (message.startsWith(config.roleAddCommand)) {
			let roleName = message.split(" ")[1];
			config.availableRoles.forEach((role) => {
				if (role.name === roleName) {
					bot.addToRole({
						serverID: bot.channels[channelID].guild_id,
						userID: userID,
						roleID: role.id
					}), (err, response) => { Console.error(err + " " + response); };
				}
			});
		}
		else if (message.startsWith(config.roleRemoveCommand)) {
			let roleName = message.split(" ")[1];
			config.availableRoles.forEach((role) => {
				if (role.name === roleName) {
					bot.removeFromRole({
						serverID: bot.channels[channelID].guild_id,
						userID: userID,
						roleID: role.id
					}), (err, response) => { Console.error(err + " " + response); };
				}
			});
		}
	};

	return this;
};