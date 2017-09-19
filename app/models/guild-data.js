const DiscordUtil = require("../../discord-bot-core").util;

module.exports = class GuildData {
	constructor({ id, allowedRoles }) {
		this.id = id;
		this.allowedRoles = allowedRoles || [];
	}
};