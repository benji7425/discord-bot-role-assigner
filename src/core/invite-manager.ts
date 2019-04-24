import { IClient } from "disharmony";
import { Guild } from "../models/guild";

async function updateInviteUsesForGuild(guild: Guild)
{
    const invites = await guild.djs.fetchInvites()
    for (let configuredInvite of guild.configuredInvites)
    {
        const invite = invites.get(configuredInvite.inviteId)
        if (invite)
            configuredInvite.uses = invite.uses
    }
}

async function updateInviteUsesForAllGuilds(client: IClient)
{
    for (let djsGuild of client.djs.guilds.values())
    {
        try
        {
            const guild = new Guild(djsGuild)
            await guild.loadDocument()
            await updateInviteUsesForGuild(guild)
            await guild.save()
        }
        catch { } //probably guild.loadDocument failed if the guild hasn't configured anything
    }
}

export {
    updateInviteUsesForGuild,
    updateInviteUsesForAllGuilds
}