// @ts-ignore
const InternalConfig = require("./internal-config.json");

module.exports = {
	Client: require("./Client.js"),
	BaseGuildData: require("./BaseGuildData.js"),
	Command: require("./Command.js"),
	util: require("./Util.js"),
	details: {
		website: InternalConfig.website,
		discordInvite: InternalConfig.discordInvite
	}
};
