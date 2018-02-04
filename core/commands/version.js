const Command = require("../command.js");
// @ts-ignore
const ParentPackageJson = require("../../package.json");

module.exports = new Command({
    name: "version",
    description: "Return version number",
    syntax: "version",
    admin: false,
    invoke
});

function invoke() {
    return Promise.resolve(`${(ParentPackageJson.name + "").replace("discord-bot-", "")} v${ParentPackageJson.version}`);
}