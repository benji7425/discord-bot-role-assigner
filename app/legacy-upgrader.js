//@ts-nocheck
const NewGuildData = require("./models/guild-data.js");
const FileSystem = require("fs");

module.exports = function () {
	if (!FileSystem.existsSync("./guilds.json"))
		return;

	const legacyJson = require("../guilds.json");

	for (let guildID of Object.keys(legacyJson)) {
		const guildData = NewGuildData.create({
			guildID,
			allowedRoles: legacyJson[guildID].allowedRoles
		});

		guildData.save();
	}

	FileSystem.rename("./guilds.json", "./guilds.json.backup");
}