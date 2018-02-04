const Command = require("../command.js");
const Discord = require("discord.js");
const InternalConfig = require("../internal-config.json");
const ParentPackageJson = require("../../package.json");

module.exports = new Command({
    name: "help",
    description: "Display available commands with descriptions",
    syntax: "help",
    admin: false,
    invoke
});

function invoke({ commands, isMemberAdmin, client }) {
    return Promise.resolve(createHelpEmbed(ParentPackageJson.name, commands, isMemberAdmin, client.user.username));
}

function createHelpEmbed(name, commands, userIsAdmin, username) {
    const commandsArr = Object.keys(commands).map(x => commands[x]).filter(x => userIsAdmin || !x.admin);

    const embed = new Discord.RichEmbed().setTitle(`__${(ParentPackageJson.name + "").replace("discord-bot-", "")} help__`);

    commandsArr.forEach(command => {
        embed.addField(command.name, `${command.description}\n**Usage:** *@${username} ${command.syntax}*${userIsAdmin && command.admin ? "\n***Admin only***" : ""}`);
    });

    embed.addField("__Need more help?__", `[Visit my website](${InternalConfig.website}) or [Join my Discord](${InternalConfig.discordInvite})`, true);

    return { embed };
}