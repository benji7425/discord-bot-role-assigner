import { PermissionLevel, Command } from "disharmony";
import { Message } from "../models/message";

async function invoke(params: string[], message: Message)
{
    const responseStr =
        message.guild.joinableRoles.length === 0 ?
            "No roles configured!" :
            `\n• ${message.guild.joinableRoles.join("\n•")}`

    return Promise.resolve(responseStr)
}

module.exports = new Command(
    /*name*/            "view-roles",
    /*description*/     "View joinable roles",
    /*syntax*/          "view-roles",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke
)