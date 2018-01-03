const RequireAll = require("require-all");

const internalCommands = RequireAll(__dirname + "/core-commands");

function handleGuildMessage(client, message, commands) {
	if (isCommand(message))
		client.guildDataModel.findOne({ guildID: message.guild.id })
			.then(guildData =>
				handleGuildCommand(
					client,
					message,
					Object.assign({}, internalCommands, commands),
					guildData || client.guildDataModel.create({ guildID: message.guild.id })
				));
}

function handleGuildCommand(client, message, commands, guildData) {
	const { botName, isMemberAdmin, params, command } = parseDetails(message, commands);

	if (!command)
		return;

	if (params.length < command.expectedParamCount)
		message.reply(`Incorrect syntax!\n**Expected:** *${botName} ${command.syntax}*\n**Need help?** *${botName} help*`);

	else if (isMemberAdmin || !command.admin)
		command.invoke({ message, params, guildData, client, commands, isMemberAdmin })
			.then(response => {
				guildData.save();
				if (response) message.reply(response);
			})
			.catch(err => err && message.reply(err));
}

function parseDetails(message, commands) {
	const split = message.content.split(/ +/);
	const commandName = Object.keys(commands).find(x =>
	/**/					commands[x].name.toLowerCase() === (split[1] || "").toLowerCase());

	return {
		botName: "@" + (message.guild.me.nickname || message.guild.me.user.username),
		isMemberAdmin: message.member.permissions.has("ADMINISTRATOR"),
		params: split.slice(2, split.length),
		command: commands[commandName]
	};
}

function isCommand(message) {
	//criteria for a command is bot being mentioned
	return new RegExp(`^<@!?${/[0-9]{18}/.exec(message.guild.me.toString())[0]}>`).exec(message.content);
}

module.exports = handleGuildMessage;