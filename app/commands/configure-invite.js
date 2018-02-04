const Core = require("../../core");

module.exports = new Core.Command({
    name: "configure-invite",
    description: "Configure a new invite and corresponding role",
    syntax: "configure-invite <invite-id> <@role>",
    admin: true,
    invoke
});

function invoke({ message, params, guildData }) {
    return new Promise((resolve, reject) => {
        const inviteID = params[0];
        const role = message.mentions.roles.first();

        if (!role) {
            reject("The role you mentioned was not valid!");
            return;
        }

        message.guild.fetchInvites().then(invites => {
            const invite = invites.get(inviteID);

            if (!invite) {
                reject("Invite not found!");
                return;
            }

            guildData.configureInvite(inviteID, role.id, invite.uses);

            resolve("Invite configured!");
        });
    });
}