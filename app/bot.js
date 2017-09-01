const GuildData = require("./models/guild-data.js");

module.exports = {
	onCommand(commandObj, commandsObj, params, guildData, message) {
		switch (commandObj.command) {
			case commandsObj.allowRole.command:
				return allowRole(message.guild, guildData, params[0]);
			case commandsObj.disallowRole.command:
				return disallowRole(guildData, params[0]);
			case commandsObj.viewRoles.command:
				return viewRoles(guildData);
			case commandsObj.joinRole.command:
				return manageRole(message.guild, guildData, message.member, params[0], true);
			case commandsObj.leaveRole.command:
				return manageRole(message.guild, guildData, message.member, params[0], false);
		}
	},
	onNonCommandMsg(message, guildData) {
		if (message.content.toLowerCase().startsWith("!joinrole"))
			message.reply("Command has updated, please now use @bot joinrole");
		else if (message.content.toLowerCase().startsWith("!leaverole"))
			message.reply("Command has updated, please now use @bot leaverole");
	}
};

function allowRole(guild, guildData, roleName) {
	return new Promise((resolve, reject) => {
		const normalisedName = normaliseRoleName(roleName);

		//check if we can find the role in the guild
		if (guild.roles.find(x => normaliseRoleName(x.name) === normalisedName)) {
			if (!guildData.allowedRoles.includes(normalisedName)) {
				guildData.allowedRoles.push(normalisedName);
				resolve("Role now allowed!");
			}
			else
				resolve("Role already allowed!");
		}
		else
			reject(`Unable to find role ${normalisedName} in guild ${guild.name}`);
	});
}

function disallowRole(guildData, roleName) {
	return new Promise((resolve, reject) => {
		const normalisedName = normaliseRoleName(roleName);

		if (guildData.allowedRoles.includes(normalisedName)) {
			const idx = guildData.allowedRoles.indexOf(normalisedName);
			guildData.allowedRoles.splice(idx, 1);
			resolve("Role now disallowed");
		}
		else
			reject("Role was not allowed in the first place");
	});
}

function viewRoles(guildData) {
	return Promise.resolve(guildData.allowedRoles.join(", "));
}

function manageRole(guild, guildData, member, roleName, isJoining) {
	return new Promise((resolve, reject) => {
		const normalisedName = normaliseRoleName(roleName);
		const role = parseRole(guild, normalisedName);

		if (!role)
			return reject("Role not found");

		if (guildData.allowedRoles.includes(normalisedName)) {
			if (isJoining)
				member.addRole(role).then(() => resolve("The role has been added")).catch(reject);
			else
				member.removeRole(role).then(() => resolve("The role has been removed")).catch(reject);
		}
		else
			reject("You are not permitted to join/leave this role");
	});
}

function normaliseRoleName(roleName) {
	return (roleName || "").toLowerCase().replace(/ /g, "");
}

function parseRole(guild, roleName) {
	return guild.roles.find(x => normaliseRoleName(x.name) === normaliseRoleName(roleName.toLowerCase())) || null;
}