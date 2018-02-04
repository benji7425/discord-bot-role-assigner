const Core = require("../core");
const GuildData = require("./models/guild-data.js");
const InviteManagement = require("./internals/invite-management.js");

// @ts-ignore
const client = new Core.Client(require("../token.json"), __dirname + "/commands", GuildData);

client.on("ready", () => InviteManagement.updateInviteUsesForAllGuilds(client));

//todo tidy up this dumb pyramid
client.on("guildMemberAdd", member => {
    GuildData.findOne({ guildID: member.guild.id })
        .then(guildData => {
            member.guild.fetchInvites()
                .then(invites => {
                    for (let configuredInvite of guildData.configuredInvites) {
                        const invite = invites.get(configuredInvite.inviteID);
                        if (invite && (invite.uses - configuredInvite.uses === 1))
                            member.addRole(configuredInvite.roleID);
                    }
                });
            InviteManagement.updateInviteUsesForGuild(client, guildData);
        });
});

client.bootstrap();