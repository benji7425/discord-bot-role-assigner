//node imports
const FileSystem = require("fs"); //manage files
const Util = require("util"); //various node utilities

//external lib imports
const Discord = require("discord.js");
const JsonFile = require("jsonfile"); //save/load data to/from json

//my imports
const DiscordUtil = require("discordjs-util"); //some discordjs helper functions of mine

//app components
const GuildData = require("./models/guild-data.js"); //data structure for guilds
const PackageJSON = require("../package.json"); //used to provide some info about the bot
const Bot = require("./bot.js");

//global vars
let writeFile = null;

//use module.exports as a psuedo "onready" function
module.exports = (client, config = null) => {
	config = config || require("./config.json"); //load config file
	const guildsData = FileSystem.existsSync(config.generic.saveFile) ? fromJSON(JsonFile.readFileSync(config.generic.saveFile)) : {}; //read data from file, or generate new one if file doesn't exist

	//create our writeFile function that will allow other functions to save data to json without needing access to the full guildsData or config objects
	//then set an interval to automatically save data to file
	writeFile = () => JsonFile.writeFile(config.generic.saveFile, guildsData, err => { if (err) DiscordUtil.dateError("Error writing file", err); });
	setInterval(() => writeFile(), config.generic.saveIntervalSec * 1000);

	//handle messages
	client.on("message", message => {
		if (message.author.id !== client.user.id) { //check the bot isn't triggering itself

			//check whether we need to use DM or text channel handling
			if (message.channel.type === "dm")
				HandleMessage.dm(client, config, message);
			else if (message.channel.type === "text" && message.member)
				HandleMessage.text(client, config, message, guildsData);
		}
	});
};

const HandleMessage = {
	dm: (client, config, message) => {
		message.reply(Util.format(config.generic.defaultDMResponse, config.generic.website, config.generic.discordInvite));
	},
	text: (client, config, message, guildsData) => {
		const isCommand = message.content.startsWith(message.guild.me.toString());
		let guildData = guildsData[message.guild.id];

		if (!guildData)
			guildData = guildsData[message.guild.id] = new GuildData({ id: message.guild.id });

		if (isCommand) {
			const userIsAdmin = message.member.permissions.has("ADMINISTRATOR");
			const botName = "@" + (message.guild.me.nickname || client.user.username);

			const split = message.content.toLowerCase().split(/\ +/); //split the message at whitespace
			const command = split[1]; //extract the command used
			const commandObj = config.commands[Object.keys(config.commands).find(x => config.commands[x].command.toLowerCase() === command)]; //find the matching command object

			if (!commandObj || (!commandObj.admin && !userIsAdmin))
				return;

			const params = split.slice(2, split.length); //extract the parameters passed for the command
			const expectedParamCount = commandObj.syntax.split(/\ +/).length - 1; //calculate the number of expected command params

			let finalisedParams;
			if (params.length > expectedParamCount) //if we have more params than needed
				finalisedParams = params.slice(0, expectedParamCount - 1).concat([params.slice(expectedParamCount - 1, params.length).join(" ")]);
			else //else we either have exactly the right amount, or not enough
				finalisedParams = params;

			//find which command was used and handle it
			switch (command) {
				case config.commands.version.command:
					message.reply(`${PackageJSON.name} v${PackageJSON.version}`);
					break;
				case config.commands.help.command:
					message.channel.send(createHelpEmbed(botName, config, userIsAdmin));
					break;
				default:
					if (finalisedParams.length >= expectedParamCount)
						Bot.onCommand(commandObj, config.commands, finalisedParams, guildData, message)
							.then(msg => {
								message.reply(msg);
								writeFile();
							})
							.catch(err => {
								message.reply(err);
								DiscordUtil.dateError(err);
							});
					else
						message.reply(`Incorrect syntax!\n**Expected:** *${botName} ${commandObj.syntax}*\n**Need help?** *${botName} ${config.commands.help.command}*`);
					break;
			}
		}
		else
			Bot.onNonCommandMsg(message, guildData);
	}
};

function fromJSON(json) {
	const guildsData = Object.keys(json);
	guildsData.forEach(guildID => { json[guildID] = new GuildData(json[guildID]); });
	return json;
}

function createHelpEmbed(name, config, userIsAdmin) {
	const commandsArr = Object.keys(config.commands).map(x => config.commands[x]).filter(x => userIsAdmin || !x.admin);

	const embed = new Discord.RichEmbed().setTitle("__Help__");

	commandsArr.forEach(command => {
		embed.addField(command.command, `${command.description}\n**Usage:** *${name} ${command.syntax}*${userIsAdmin && command.admin ? "\n***Admin only***" : ""}`);
	});

	embed.addField("__Need more help?__", `[Visit my website](${config.generic.website}) or [Join my Discord](${config.generic.discordInvite})`, true);

	return { embed };
}