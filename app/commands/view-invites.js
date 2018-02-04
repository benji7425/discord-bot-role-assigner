const Core = require("../../core");

module.exports = new Core.Command({
    name: "view-invites",
    description: "View configured invite",
    syntax: "view-invites",
    admin: true,
    invoke
});

function invoke({ guildData }) {
    if (guildData.configuredInvites.length === 0)
        return Promise.resolve("No invites configured!");
    return Promise.resolve(guildData.configuredInvites.map(x => x.toString()).join("\n"));
}