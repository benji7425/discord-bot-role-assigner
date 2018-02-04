const GuildData = require("../models/guild-data.js");

function updateInviteUsesForGuild(client, guildData) {
    const guild = client.guilds.get(guildData.guildID);
    guild.fetchInvites().then(invites => {
        const configuredInvites = guildData.configuredInvites
            .filter(x => invites.get(x.inviteID))
            .map(configuredInvite => ({ configuredInvite, invite: invites.get(configuredInvite.inviteID) }));

        for (let { configuredInvite, invite } of configuredInvites)
            configuredInvite.uses = invite.uses;

        guildData.save();
    });
}

function updateInviteUsesForAllGuilds(client) {
    GuildData.find({}).then(guildDatas => {
        for (let guildData of guildDatas.filter(guildData => client.guilds.get(guildData.guildID)))
            updateInviteUsesForGuild(guildData);
    });
}

module.exports = {
    updateInviteUsesForGuild,
    updateInviteUsesForAllGuilds
};