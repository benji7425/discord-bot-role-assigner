const DiscordUtil = require("discordjs-util");

module.exports = class GuildData {
	constructor({ id, allowedRoles }) {
		this.id = id;
		this.allowedRoles = allowedRoles || [];
	}
};