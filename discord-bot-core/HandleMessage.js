const Discord = require("discord.js");
// @ts-ignore
const ParentPackageJSON = require("../package.json");
// @ts-ignore
const InternalConfig = require("./internal-config.json");

/**@param param*/
function handleMessage(client, message, commands, guildData) {
	if (!message.content.startsWith(message.guild.me.toString()) //criteria for a command is the bot being tagged
			&& !message.content.startsWith(message.guild.me.toString().replace("!", ""))) //hacky fix for android mentions not including an exclamation mark
		return;

	const botName = "@" + (message.guild.me.nickname || message.guild.me.user.username),
		isMemberAdmin = message.member.permissions.has("ADMINISTRATOR"),
		split = message.content.split(/ +/),
		params = split.slice(2, split.length),
		command = commands[Object.keys(commands).find(x => commands[x].name.toLowerCase() === (split[1] || "").toLowerCase())];

	if (!command)
		handleInternalCommand(message, split, commands, isMemberAdmin);
	else if (params.length < command.expectedParamCount)
		message.reply(`Incorrect syntax!\n**Expected:** *${botName} ${command.syntax}*\n**Need help?** *${botName} help*`);
	else if (isMemberAdmin || !command.admin)
		command.invoke({ message, params, guildData, client })
			.then(response => {
				client.writeFile();
				if (response)
					message.reply(response);
			})
			.catch(err => {
				if (err)
					message.reply(err);
			});
}

/**@param param*/
function handleInternalCommand(message, split, commands, isMemberAdmin) {
	if (!split[1])
		return;

	if (split[1].toLowerCase() === "version")
		message.reply(`${ParentPackageJSON.name} v${ParentPackageJSON.version}`);
	else if (split[1].toLowerCase() === "help") {
		const helpCommands = [...Object.keys(commands).map(x => commands[x])];
		helpCommands.push({
			name: "version",
			description: "Return version number",
			syntax: "version"
		});
		helpCommands.push({
			name: "help",
			description: "View help",
			syntax: "help"
		});
		message.reply(createHelpEmbed(ParentPackageJSON.name, helpCommands, isMemberAdmin));
	}
}

/**
 * Create a help embed for available commands
 * @param {string} name name of the bot
 * @param {*[]} commands commands array
 * @param {boolean} userIsAdmin whether the user is admin
 */
function createHelpEmbed(name, commands, userIsAdmin) {
	const commandsArr = Object.keys(commands).map(x => commands[x]).filter(x => userIsAdmin || !x.admin);

	const embed = new Discord.RichEmbed().setTitle(`__Help__ for ${(ParentPackageJSON.name + "").replace("discord-bot-", "")}`);

	commandsArr.forEach(command => {
		embed.addField(command.name, `${command.description}\n**Usage:** *${name} ${command.syntax}*${userIsAdmin && command.admin ? "\n***Admin only***" : ""}`);
	});

	embed.addField("__Need more help?__", `[Visit my website](${InternalConfig.website}) or [Join my Discord](${InternalConfig.discordInvite})`, true);

	return { embed };
}


module.exports = handleMessage;