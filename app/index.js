const Core = require("../discord-bot-core");
const GuildData = require("./models/guild-data.js");

//INTERNAL FUNCTIONS//
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

//BOOTSTRAPPING//
const token = require("../" + process.argv[2]).token,
	dataFile = process.argv[3],
	commands = require("./commands.json"),
	implementations = {
		onTextMessage,
		allowRole,
		disallowRole,
		viewRoles,
		joinRole,
		leaveRole,
		updateHelp
	};
const client = new Core.Client(token, dataFile, commands, implementations, GuildData);
client.bootstrap();