const Core = require("../../core");
const configuredInvite = require("./invite-data.js");

module.exports = class GuildData extends Core.BaseGuildData {
    constructor() {
        super();

        this.allowedRoles = [];
        this.configuredInvites = [];

        this.schema({
            allowedRoles: [String],
            configuredInvites: [configuredInvite]
        });
    }
};