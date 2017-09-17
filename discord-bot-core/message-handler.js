//node imports
const Util = require("util");

//external lib imports
const Discord = require("discord.js");

//component imports
const Config = require("./internal-config.json"); //generic lib configuration
const ParentPackageJSON = require("../package.json"); //used to provide some info about the bot

/**
 * Handle a direct message to the bot
 * @param {*} coreClient Core.Client
 * @param {*} message Discord.Message
 */
function handleDirectMessage(coreClient, message) {
	message.reply(Util.format(Config.defaultDMResponse, Config.website, Config.discordInvite));
}

/**
 * 
 * @param {*} coreClient Core.Client
 * @param {*} message Discord.Message
 * @param {*[]} guildsData GuildData[]
 */
function handleTextMessage(coreClient, message, guildsData) {
	return new Promise((resolve, reject) => {
		const isCommand = message.content.startsWith(message.guild.me.toString());
		let guildData = guildsData[message.guild.id];

		if (!guildData)
			guildData = guildsData[message.guild.id] = new coreClient.guildDataModel({ id: message.guild.id });

		if (!isCommand)
			return coreClient.implementations.onTextMessage(message, guildData).then(msg => resolve(msg));

		Object.assign(coreClient.commands, Config.commands);
		const userIsAdmin = message.member.permissions.has("ADMINISTRATOR");
		const botName = "@" + (message.guild.me.nickname || coreClient.actual.user.username);
		const { command, commandProp, params, expectedParamCount } = getCommandDetails(message, coreClient.commands, userIsAdmin) || { command: null, commandProp: null, params: null, expectedParamCount: null };
		const invoke = coreClient.implementations[commandProp];

		if (!command || !params || isNaN(expectedParamCount))
			return reject(`'${message.content.split(" ")[1]}' is not a recognised command`);

		if (command === Config.commands.version)
			resolve(`${ParentPackageJSON.name} v${ParentPackageJSON.version}`);
		else if (command === Config.commands.help)
			message.channel.send(createHelpEmbed(botName, coreClient.commands, userIsAdmin));
		else {
			if (invoke && params.length >= expectedParamCount)
				invoke({ command, params: params, guildData, botName, message, coreClient })
					.then(msg =>
						resolve(msg))
					.catch(err => reject(err));
			else
				reject(`Incorrect syntax!\n**Expected:** *${botName} ${command.syntax}*\n**Need help?** *${botName} ${coreClient.commands.help.command}*`);
		}
	});
}

/**
 * Determine details about a command invoked via a message
 * @param {*} message Discord.Message
 * @param {*[]} commands commands array (probably from commands.json)
 * @param {boolean} userIsAdmin whether the user is an admin
 */
function getCommandDetails(message, commands, userIsAdmin) {
	const splitMessage = message.content.toLowerCase().split(/ +/);
	const commandStr = splitMessage[1];
	const commandProp = Object.keys(commands).find(x => commands[x].command.toLowerCase() === commandStr);
	const command = commands[commandProp];

	if (!command || (command.admin && !userIsAdmin))
		return;

	const params = splitMessage.slice(2, splitMessage.length);
	const expectedParamCount = command.syntax.split(/ +/).length - 1;

	let finalisedParams;
	if (params.length > expectedParamCount)
		finalisedParams = params.slice(0, expectedParamCount - 1).concat([params.slice(expectedParamCount - 1, params.length).join(" ")]);
	else
		finalisedParams = params;

	return { command, commandProp, params: finalisedParams, expectedParamCount };
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
		embed.addField(command.command, `${command.description}\n**Usage:** *${name} ${command.syntax}*${userIsAdmin && command.admin ? "\n***Admin only***" : ""}`);
	});

	embed.addField("__Need more help?__", `[Visit my website](${Config.website}) or [Join my Discord](${Config.discordInvite})`, true);

	return { embed };
}

module.exports = {
	handleDirectMessage,
	handleTextMessage
};