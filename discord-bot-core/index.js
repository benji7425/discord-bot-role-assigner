const Config = require("./internal-config.json");

module.exports = {
	Client: require("./client.js"),
	util: require("./util.js"),
	details: {
		website: Config.website,
		discordInvite: Config.discordInvite
	}
};
