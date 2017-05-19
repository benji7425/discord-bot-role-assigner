const Config = require("./config.json");
const Console = require("console");

module.exports = {
	onMessage: (bot, user, userID, channelID, message) => {
		if (message.startsWith(Config.roleAddCommand)) {
			let roleName = message.split(" ")[1];
			Config.availableRoles.forEach((role) => {
				if (role.name === roleName) {
					bot.addToRole({
						serverID: bot.channels[channelID].guild_id,
						userID: userID,
						roleID: role.id
					}), (err, response) => { Console.error(err + " " + response); };
				}
			});
		}
		else if (message.startsWith(Config.roleRemoveCommand)) {
			let roleName = message.split(" ")[1];
			Config.availableRoles.forEach((role) => {
				if (role.name === roleName) {
					bot.removeFromRole({
						serverID: bot.channels[channelID].guild_id,
						userID: userID,
						roleID: role.id
					}), (err, response) => { Console.error(err + " " + response); };
				}
			});
		}
	}
};