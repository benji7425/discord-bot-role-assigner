const Core = require("../../core");
const InviteData = require("./invite-data.js");

module.exports = class GuildData extends Core.BaseGuildData {
    constructor() {
        super();

        this.allowedRoles = [];
        this.configuredInvites = [];

        this.schema({
            allowedRoles: [String],
            configuredInvites: [InviteData]
        });
    }

    configureInvite(inviteID, roleID, uses) {
        // @ts-ignore
        const inviteData = InviteData.create({ inviteID: inviteID, roleID: roleID, uses: uses });
        this.configuredInvites.push(inviteData);
    }
};