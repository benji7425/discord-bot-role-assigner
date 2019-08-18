import { Command, PermissionLevel } from "disharmony"
import { Message } from "../models/message"

async function invoke(_: string[], message: Message)
{
    const responseStr =
        message.guild.joinableRoles.length === 0 ?
            "No roles configured!" :
            `\n• ${message.guild.joinableRoles.join("\n•")}`

    return Promise.resolve(responseStr)
}

export default new Command(
    /*syntax*/          "view-roles",
    /*description*/     "View joinable roles",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke,
)