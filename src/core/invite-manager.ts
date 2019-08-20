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
        catch (ex)
        {
            // TODO Add some proper error handling or something
            Logger.debugLogError(`Failed to update invite users for guild ${djsGuild.id}`, ex)
            Logger.logEvent("ErrorUpdatingInviteUses")
        }
    }
}

export
{
    updateInviteUsesForGuild,
    updateInviteUsesForAllGuilds,
}