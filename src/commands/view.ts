import { Message } from "../models/message";
import { DisharmonyClient } from "disharmony";
import Command, { PermissionLevel } from "disharmony/lib/commands/command";

async function invoke(params: string[], message: Message, client: DisharmonyClient)
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