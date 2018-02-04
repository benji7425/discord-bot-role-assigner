const Core = require("../../core");
const DiscordUtil = require("../../core").util;

module.exports = class GuildData extends Core.BaseGuildData {
	constructor() {
		super();

		this.allowedRoles = [String];
	}
};