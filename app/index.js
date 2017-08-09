//node imports
const FileSystem = require("fs");
const Util = require("util");

//external lib imports
const JsonFile = require("jsonfile");

//my imports
const DiscordUtil = require("discordjs-util");

//global vars
const SAVE_FILE = "./guilds.json";

//when loaded with require() by an external script, this acts as a kind of "on ready" function
module.exports = (client) => {
	const config = require("./config.json");
	const data = FileSystem.existsSync(SAVE_FILE) ? JsonFile.readFileSync(SAVE_FILE) : {};

	client.on("message", (message) => {
		if (message.channel.type !== "text" || !message.member)
			return;

		const doCatch = e => { DiscordUtil.dateError(e); return e; },
			doThen = m => message.reply(m || "An unknown error occured");

		if (message.content.startsWith(client.user.toString()) //user is @mention-ing the bot
			&& message.member.permissions.has("ADMINISTRATOR") //user has admin perms
			&& message.member.id !== client.user.id) //isn't the bot accidentally triggering itself
		{
			const params = message.content.split(" "); //[ client.user.id, command, args ] expected

			if (params.length < 2)
				return;
			
			switch (params[1].toLowerCase()) {
				case config.allowCommand:
					RolePerms.allow(message.guild, data, params[2]).then(writeFile(data)).catch(doCatch).then(doThen);
					break;
				case config.disallowCommand:
					RolePerms.disallow(message.guild, data, params[2]).then(writeFile(data)).catch(doCatch).then(doThen);
					break;
			}
		}
		else if (message.content.startsWith(config.joinCommand)) //user is trying to join a role
			manageRole(message.guild, message.member, data, message.content.split(" ")[1], true).catch(doCatch).then(doThen);
		else if (message.content.startsWith(config.leaveCommand)) //user is trying to leave a role
			manageRole(message.guild, message.member, data, message.content.split(" ")[1], false).catch(doCatch).then(doThen);
	});
};

/**
 * Handling for whether or not roles are allowed to be managed by users
 */
const RolePerms = {
	allow: (guild, data, roleName) => {
		return new Promise((resolve, reject) => {
			const normalisedName = normaliseRoleName(roleName);

			//if we found the role, make sure we have data for this guild and save this role
			if (guild.roles.find(x => normaliseRoleName(x.name) === normalisedName)) {
				if (!data[guild.id])
					data[guild.id] = [];

				//save the role if not already saved
				if (!data[guild.id].includes(normalisedName)) {
					data[guild.id].push(normalisedName);
					resolve("Role now allowed");
				}
				else
					resolve("Role already allowed");
			}
			else
				reject(Util.format("Unable to find role with normalised name '%s' in guild '%s'", normalisedName, guild.name));
		});
	},
	disallow: (guild, data, roleName) => {
		return new Promise((resolve, reject) => {
			const normalisedName = normaliseRoleName(roleName);

			//if the role is found, remove it and resolve
			if (data[guild.id] && data[guild.id].includes(normalisedName)) {
				const idx = data[guild.id].indexOf(normalisedName);
				data[guild.id].splice(idx, 1);
				resolve("Role now disallowed");
			}
			else
				reject("Role was not allowed in the first place");
		});
	}
};

function manageRole(guild, member, data, roleName, doAdd) {
	return new Promise((resolve, reject) => {
		const normalisedName = normaliseRoleName(roleName);
		const role = parseRole(guild, normalisedName);

		if (role) {
			if (data[guild.id] && data[guild.id].includes(normalisedName))
				if (doAdd)
					member.addRole(role).then(resolve("The role has been added")).catch(reject);
				else
					member.removeRole(role).then(resolve("The role has been removed")).catch(reject);
			else
				reject("You are not permitted to join/leave this role");
		}
		else
			reject(Util.format("No such role '%s' found in guild '%s'", normalisedName, guild.name));
	});
}

function parseRole(guild, roleName) {
	return guild.roles.find(x => normaliseRoleName(x.name) === normaliseRoleName(roleName.toLowerCase())) || null;
}

function normaliseRoleName(roleName) {
	return (roleName || "").toLowerCase().replace(/ /g, "");
}

function writeFile(data) {
	JsonFile.writeFile(SAVE_FILE, data, err => { if (err) DiscordUtil.dateError(err); });
}