const Core = require("../discord-bot-core");
const GuildData = require("./models/guild-data.js");

//IMPLEMENTATIONS//
function onTextMessage(message, guildData) {
	const botName = "@" + (message.guild.me.nickname || message.guild.me.user.username);
	if (message.content.toLowerCase().startsWith("!joinrole"))
		message.reply(`The command you used has been updated, please use *${botName} joinrole* instead.\nAsk your server admin to run *${botName} update-help* to learn why this was necessary.`);
	else if (message.content.toLowerCase().startsWith("!leaverole"))
		message.reply(`The command you used has been updated, please use *${botName} leaverole* instead.\nAsk your server admin to run *${botName} update-help* to learn why this was necessary.`);
}

function allowRole({ command, params, guildData, botName, message, coreClient }) {
	return new Promise((resolve, reject) => {
		const normalisedName = normaliseRoleName(params[0]);

		//check if we can find the role in the guild
		if (message.guild.roles.find(x => normaliseRoleName(x.name) === normalisedName)) {
			if (!guildData.allowedRoles.includes(normalisedName)) {
				guildData.allowedRoles.push(normalisedName);
				resolve("Role now allowed!");
			}
			else
				resolve("Role already allowed!");
		}
		else
			reject(`Unable to find role ${normalisedName} in guild ${message.guild.name}`);
	});
}

function disallowRole({ command, params, guildData, botName, message, coreClient }) {
	return new Promise((resolve, reject) => {
		const normalisedName = normaliseRoleName(params[0]);

		if (guildData.allowedRoles.includes(normalisedName)) {
			const idx = guildData.allowedRoles.indexOf(normalisedName);
			guildData.allowedRoles.splice(idx, 1);
			resolve("Role now disallowed");
		}
		else
			reject("Role was not allowed in the first place");
	});
}

function viewRoles({ command, params, guildData, botName, message, coreClient }) {
	return Promise.resolve(guildData.allowedRoles.join(", "));
}

function joinRole({ command, params, guildData, botName, message, coreClient }) {
	manageRole(message.guild, guildData, message.member, params[0], true);
}

function leaveRole({ command, params, guildData, botName, message, coreClient }) {
	manageRole(message.guild, guildData, message.member, params[0], false);
}

function updateHelp({ command, params, guildData, botName, message, coreClient }) {
	message.member.send(`The commands *!joinrole* and *!leaverole* were updated to avoid potential clashes with other bots that users may have in their servers. These commands now require users to invoke them with an @mention to the bot, to ensure they don't trigger any other bot you might have.
	I will do my best to minimise significant changes like this in the future. If necessary, I am contact-able for support via my support Discord server: <https://discord.gg/SSkbwSJ>. I will do my best to get back to you ASAP if you have queries, but can't always respond straight away.
	You can also run *${botName} help* in a server to view a new help message.`);
	return Promise.resolve("Please check PMs");
}

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