const Core = require("../../core");

module.exports = new Core.Command({
    name: "remove-invite",
    description: "Remove a configured invite",
    syntax: "remove-invite <invite-id>",
    admin: true,
    invoke
});

function invoke({ params, guildData }) {
    const idx = guildData.configuredInvites.findIndex(invite => invite.inviteID === params[0]);
    if (!Number.isInteger(idx))
        return Promise.reject("Can't find invite with id " + params[0]);

    guildData.configuredInvites.splice(idx, 1);
    return Promise.resolve("Invite removed!");
}