const Console = require("console");

var config;

module.exports = (_config) => {
	config = _config || require("./config.json");

	this.commands = [
		{
			command: config.roleAddCommand,
			type: "startsWith",
			action: (bot, user, userID, channelID, message) => {
				let roleName = message.split(" ")[1];
				let roleID = getRoleIDFromName(roleName, config.availableRoles);

				addRole(bot, user, userID, channelID, roleID, roleName);
			}
		},
		{
			command: config.roleRemoveCommand,
			type: "startsWith",
			action: (bot, user, userID, channelID, message) => {
				let roleName = message.split(" ")[1];
				let roleID = getRoleIDFromName(roleName, config.availableRoles);

				removeRole(bot, user, userID, channelID, roleID, roleName);
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

	//check if we have any roles with specific command aliases
	if (config.availableRoles.some((role) => { return role.roleAddAlias !== undefined && role.roleRemoveAlias !== undefined; }))
		//add an onMessage handler to check for the command aliases
		this.onMessage = (bot, user, userID, channelID, message) => {
			config.availableRoles.forEach((role) => {
				if (message === role.roleAddAlias)
					addRole(bot, user, userID, channelID, role.id, role.name);
				else if (message === role.roleRemoveAlias)
					removeRole(bot, user, userID, channelID, role.id, role.name);
			});
		};

	return this;
};

var addRole = (bot, user, userID, channelID, roleID, roleName) => {
	if (roleID !== null && roleID !== undefined) //make sure the role exists
		bot.addToRole({ //add the user to the role
			serverID: bot.channels[channelID].guild_id,
			userID: userID,
			roleID: roleID
		}, (err, response) => {
			if (err)
				Console.error(err); //log the error if there is one
			else
				bot.sendMessage({ //else response with a confirmation message
					to: channelID,
					message: config.confirmation.roleAddMessage.replace(config.confirmation.roleNameIdentifier, roleName) //construct the response message based on the configuration
				}, (err, response) => {
					if (err)
						Console.error(err); //log the error sending the response message if there is one
					else
						setTimeout(() => bot.deleteMessage({ //else delete it after a time period
							channelID: channelID,
							messageID: response.id
						}), config.confirmation.messageDeleteTime);
				});
		});
	else
		Console.error(user + " tried to remove role '" + roleName + "' but this role does not exist!");
};

var removeRole = (bot, user, userID, channelID, roleID, roleName) => {
	if (roleID !== null && roleID !== undefined) //make sure the role exists
		bot.removeFromRole({ //remove the user from the role
			serverID: bot.channels[channelID].guild_id,
			userID: userID,
			roleID: roleID
		}, (err, response) => {
			if (err)
				Console.error(err);
			else
				bot.sendMessage({ //else respond with a confirmation message
					to: channelID,
					message: config.confirmation.roleRemoveMessage.replace(config.confirmation.roleNameIdentifier, roleName) //construct the response message based on the configuration
				}, (err, response) => {
					if (err)
						Console.error(err); //log the error sending the response message if there is one
					else
						setTimeout(() => bot.deleteMessage({ //else delete it after a time period
							channelID: channelID,
							messageID: response.id
						}), config.confirmation.messageDeleteTime);
				});
		});
	else
		Console.error(user + " tried to remove role '" + roleName + "' but this role does not exist!");
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