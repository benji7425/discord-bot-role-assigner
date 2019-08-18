import { BotMessage, Command, PermissionLevel } from "disharmony"
import { Guild } from "../models/guild"

async function invoke(_: string[], message: BotMessage)
{
    const guild = new Guild(message.guild.djs)

    const responseStr =
        guild.joinableRoles.length === 0 ?
            "No roles configured!" :
            `\n• ${guild.joinableRoles.join("\n•")}`

    return Promise.resolve(responseStr)
}

export default new Command(
    /*syntax*/          "view-roles",
    /*description*/     "View joinable roles",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke,
)