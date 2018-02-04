// @ts-ignore
const InternalConfig = require("./internal-config.json");

module.exports = {
    Client: require("./client.js"),
    BaseGuildData: require("./base-guild-data.js"),
    BaseEmbeddedData: require("./base-embedded-data.js"),
    Command: require("./command.js"),
    util: require("./util.js"),
    details: {
        website: InternalConfig.website,
        discordInvite: InternalConfig.discordInvite
    }
};
