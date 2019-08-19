import { BotMessage, Command, CommandRejection, PermissionLevel } from "disharmony"
import { Guild } from "../models/guild"
import Invite from "../models/invite"

async function invoke(params: string[], message: BotMessage)
{
    const guild = new Guild(message.guild.djs)

    const inviteId = params[0]
    const invites = await message.guild.djs.fetchInvites()
    const invite = invites.get(inviteId)

    if (!invite)
        throw new CommandRejection(`Invite with id '${inviteId}' not found`)

    const role = message.mentions.roles.first()
    if (role)
        guild.configuredInvites.push(new Invite(inviteId, role.id, invite.uses))
    else if (params[1].toLowerCase() === "remove")
    {
        const idx = guild.configuredInvites.findIndex(x => x.inviteId === inviteId)
        guild.configuredInvites.splice(idx, 1)
    }
    else
        throw new CommandRejection("Please either @mention a role, or use 'remove' as the last parameter to remove this configured invite")

    return "Success!"
}

export default new Command(
    /*syntax*/          "configure-invite <invite-id> <@role|remove>",
    /*description*/     "Configure an invite to assign a role when used, or remove a configured invite",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke,
)