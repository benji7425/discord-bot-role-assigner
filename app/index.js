//node imports
const FileSystem = require("fs");

//external lib imports
const JsonFile = require("jsonfile");

//my imports
const Util = require("discordjs-util");

//global vars
const SAVE_FILE = "./guilds.json";

//when loaded with require() by an external script, this acts as a kind of "on ready" function
module.exports = (client) => {
	const data = FileSystem.existsSync(SAVE_FILE) ? JsonFile.readFileSync(SAVE_FILE) : {};

	client.on("message", (message) => {
		if (message.content.startsWith(client.user.toString()) //user is @mention-ing the bot
			&& message.member.permissions.has("ADMINISTRATOR") //user has admin perms
			&& message.member.id !== client.user.id) //isn't the bot accidentally triggering itself
		{
			const params = message.content.split(" "); //[ client.user.id, command, args ] expected
			switch (params[1].toLowerCase()) {
				case "allow":
					RolePerms.allow(message.guild, data, message.mentions.roles.first());
					break;
				case "disallow":
					RolePerms.disallow(message.guild, data, message.mentions.roles.first());
					break;
			}
		}
		else if (message.content.startsWith("!joinrole")) //user is trying to join a role
			RoleManagement.join(message.guild, message.member, data, message.content.split(" ")[1]);
		else if (message.content.startsWith("!leaverole")) //user is trying to leave a role
			RoleManagement.leave(message.guild, message.member, data, message.content.split(" ")[1]);
	});
};

const RoleManagement = {
	join: (guild, member, data, roleName) => {
		const role = parseRole(guild, roleName);
		if (role && data[guild.id].includes(role.id))
			member.addRole(role);
	},
	leave: (guild, member, data, roleName) => {
		const role = parseRole(guild, roleName);
		if (role && data[guild.id].includes(role.id))
			member.removeRole(role);
	}
};

const RolePerms = {
	allow: (guild, data, role) => {
		if (!role)
			return;

		if (!data[guild.id]) //ensure we have an array of roles for this guild
			data[guild.id] = [];

		data[guild.id].push(role.id); //add this as an allowed role

		writeFile(data);
	},
	disallow: (guild, data, role) => {
		if (!role)
			return;

		if (!data[guild.id]) //ensure we have an array of roles for this guild
			data[guild.id] = [];
		data[guild.id].splice(data[guild.id].indexOf(role.id), 1); //remove this as an allowed role

		writeFile(data);
	}
};

function parseRole(guild, roleName) {
	return guild.roles.find(x => x.name.toLowerCase() === roleName.toLowerCase()) || null;
}

function writeFile(data) {
	JsonFile.writeFile(SAVE_FILE, data, err => { if (err) Util.dateError(err); });
}