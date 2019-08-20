import { Command, CommandRejection, Logger, PermissionLevel } from "disharmony"
import Invite from "../models/invite"
import { Message } from "../models/message"

async function invoke(params: string[], message: Message)
{
    const inviteId = params[0]
    const invites = await message.guild.djs.fetchInvites()
    const invite = invites.get(inviteId)

    if (!invite)
        throw new CommandRejection(`Invite with id '${inviteId}' not found`)

    const role = message.mentions.roles.first()
    if (role)
        message.guild.configuredInvites.push(new Invite(inviteId, role.id, invite.uses))
    else if (params[1].toLowerCase() === "remove")
    {
        const idx = message.guild.configuredInvites.findIndex(x => x.inviteId === inviteId)
        message.guild.configuredInvites.splice(idx, 1)
    }
    else
        throw new CommandRejection("Please either @mention a role, or use 'remove' as the last parameter to remove this configured invite")

    Logger.logEvent("InviteConfigured")

    return "Success!"
}

export default new Command(
    /*syntax*/          "configure-invite <invite-id> <@role|remove>",
    /*description*/     "Configure an invite to assign a role when used, or remove a configured invite",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke,
)