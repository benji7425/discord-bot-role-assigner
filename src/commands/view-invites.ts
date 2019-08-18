import { BotMessage, Command, PermissionLevel } from "disharmony"
import { Guild } from "../models/guild"

async function invoke(_: string[], message: BotMessage)
{
    const guild = new Guild(message.guild.djs)

    if (guild.configuredInvites.length === 0)
        return "No invites configured!"
    return guild.configuredInvites.map(x =>
        `\`\`\`\n${JSON.stringify(x)}\`\`\``)
            .join("\n")
}

export default new Command(
    /*syntax*/          "view-invites",
    /*description*/     "View list of configured invites and their roles",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke,
)