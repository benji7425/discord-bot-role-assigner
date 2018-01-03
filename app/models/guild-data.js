const Core = require("../../discord-bot-core");
const DiscordUtil = require("../../discord-bot-core").util;

module.exports = class GuildData extends Core.BaseGuildData {
	constructor() {
		super();

		this.allowedRoles = [String];
	}
};