import { Command, PermissionLevel } from "disharmony"
import { Message } from "../models/message"

async function invoke(_: string[], message: Message)
{
    if (message.guild.configuredInvites.length === 0)
        return "No invites configured!"
    return message.guild.configuredInvites.map(x =>
        `\`\`\`\n${JSON.stringify(x)}\`\`\``)
            .join("\n")
}

export default new Command(
    /*syntax*/          "view-invites",
    /*description*/     "View list of configured invites and their roles",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke,
)