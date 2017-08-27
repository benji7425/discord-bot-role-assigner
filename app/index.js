//node imports
const FileSystem = require("fs");
const Util = require("util");

//external lib imports
const JsonFile = require("jsonfile");

//my imports
const DiscordUtil = require("discordjs-util");

//global vars
let writeFile = null;

//when loaded with require() by an external script, this acts as a kind of "on ready" function
module.exports = (client, config = null) => {
	config = config || require("./config.json");
	const guildsData = FileSystem.existsSync(config.generic.saveFile) ? fromJSON(JsonFile.readFileSync(config.generic.saveFile)) : {}; //read data from file, or generate new one if file doesn't exist
	writeFile = () => JsonFile.writeFile(config.generic.saveFile, guildsData, err => { if (err) DiscordUtil.dateError("Error writing file", err); });
	setInterval(() => writeFile(), config.generic.saveIntervalSec * 1000); //set interval to save data to file

	client.on("message", message => {
		if (message.author.id !== client.user.id) { //check the bot isn't triggering itself
			if (message.channel.type === "dm")
				HandleMessage.dm(client, config, message);
			else if (message.channel.type === "text" && message.member)
				HandleMessage.text(client, config, message, guildsData);
		}
	});
};

const HandleMessage = {
	dm: (client, config, message) => {
		message.reply(config.generic.defaultDMResponse);
	},
	text: (client, config, message, guildsData) => {
		const doCatch = e => { DiscordUtil.dateError(e); return e; },
			doThen = m => message.reply(m || "An unknown error occured");

		//handle admins invoking commands
		if (message.content.startsWith(message.guild.me.toString()) //user is @mention-ing the bot
			&& message.member.permissions.has("ADMINISTRATOR")) //user has admin perms
		{
			const params = message.content.split(" "); //split the message at the spaces

			//check which command was invoked
			switch (params[1]) {
				case config.commands.admin.version:
					message.reply("v" + require("../package.json").version);
					break;
				case config.commands.admin.allowCommand:
					RolePerms.allow(message.guild, guildsData, params[2]).then(writeFile(guildsData)).catch(doCatch).then(doThen);
					break;
				case config.commands.admin.disallowCommand:
					RolePerms.disallow(message.guild, guildsData, params[2]).then(writeFile(guildsData)).catch(doCatch).then(doThen);
					break;
			}
		}
		else if (message.content.startsWith(config.commands.anyone.joinCommand)) //user is trying to join a role
			manageRole(message.guild, message.member, guildsData, message.content.split(" ")[1], true).catch(doCatch).then(doThen);
		else if (message.content.startsWith(config.commands.anyone.leaveCommand)) //user is trying to leave a role
			manageRole(message.guild, message.member, guildsData, message.content.split(" ")[1], false).catch(doCatch).then(doThen);
	}
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

function fromJSON(json) {
	return json;
}