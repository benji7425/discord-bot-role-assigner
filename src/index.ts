import { Client } from "disharmony"
import { Message } from "./models/message";
import { GuildMember as DjsGuildMember } from "discord.js";
import { Guild } from "./models/guild";
import { updateInviteUsesForGuild, updateInviteUsesForAllGuilds } from "./core/invite-manager";

let client = new Client("Role Assigner", require("./commands"), Message)

client.onReady.sub(() => updateInviteUsesForAllGuilds(client))
client.djs.on("guildMemberAdd", onGuildMemberAdd)

client.initialize(require("fs").readFileSync("./token", "utf8"))

async function onGuildMemberAdd(djsGuildMember: DjsGuildMember)
{
    const guild = new Guild(djsGuildMember.guild)
    await guild.loadDocument()

    const invites = await guild.djs.fetchInvites()

    for (let configuredInvite of guild.configuredInvites)
    {
        const invite = invites.get(configuredInvite.inviteId)
        if (invite && (invite.uses - configuredInvite.uses === 1))
            djsGuildMember.addRole(configuredInvite.roleId)
    }
    await updateInviteUsesForGuild(guild)
    await guild.save()
}