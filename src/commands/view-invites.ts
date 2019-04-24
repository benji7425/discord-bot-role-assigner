import { Message } from "../models/message";
import { PermissionLevel, Command } from "disharmony";

async function invoke(params: string[], message: Message)
{
    if (message.guild.configuredInvites.length === 0)
        return "No invites configured!"
    return message.guild.configuredInvites.map(x =>
        `\`\`\`\n${JSON.stringify(x)}\`\`\``)
            .join("\n")
}

module.exports = new Command(
    /*name*/            "view-invites",
    /*description*/     "View list of configured invites and their roles",
    /*syntax*/          "view-invites",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke
)