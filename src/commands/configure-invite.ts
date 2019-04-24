import { Message } from "../models/message";
import { PermissionLevel, Command } from "disharmony";
import Invite from "../models/invite";

async function invoke(params: string[], message: Message)
{
    const inviteId = params[0]
    const invites = await message.guild.djs.fetchInvites()
    const invite = invites.get(inviteId)

    if (!invite)
        throw `Invite with id '${inviteId}' not found`

    const role = message.mentions.roles.first()
    if (role)
        message.guild.configuredInvites.push(new Invite(inviteId, role.id, invite.uses))
    else if (params[1].toLowerCase() === "remove")
    {
        const idx = message.guild.configuredInvites.findIndex(x => x.inviteId === inviteId)
        message.guild.configuredInvites.splice(idx, 1)
    }
    else
        throw "Please either @mention a role, or use 'remove' as the last parameter to remove this configured invite"

    return "Success!"
}

module.exports = new Command(
    /*name*/            "configure-invite",
    /*description*/     "Configure an invite to assign a role when used, or remove a configured invite",
    /*syntax*/          "configure-invite <invite-id> <@role|remove>",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke
)