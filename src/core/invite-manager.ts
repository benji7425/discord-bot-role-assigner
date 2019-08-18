import { IClient, Logger } from "disharmony"
import { Guild } from "../models/guild"

async function updateInviteUsesForGuild(guild: Guild)
{
    const invites = await guild.djs.fetchInvites()
    for (const configuredInvite of guild.configuredInvites)
    {
        const invite = invites.get(configuredInvite.inviteId)
        if (invite)
            configuredInvite.uses = invite.uses
    }
}

async function updateInviteUsesForAllGuilds(client: IClient)
{
    for (const djsGuild of client.djs.guilds.values())
    {
        try
        {
            const guild = new Guild(djsGuild)
            await guild.loadDocument()
            await updateInviteUsesForGuild(guild)
            await guild.save()
        }
        catch
        {
            // TODO Add some proper error handling or something
            // Probably guild.loadDocument failed if the guild hasn't configured anything
            Logger.debugLog("Failed to update invite users for some guild")
        }
    }
}

export
{
    updateInviteUsesForGuild,
    updateInviteUsesForAllGuilds,
}