import { Message } from "../models/message";
import { DisharmonyClient } from "disharmony";
import Command, { PermissionLevel } from "disharmony/lib/commands/command";
import { normaliseRole } from "../utilities";

function invoke(params: string[], message: Message, client: DisharmonyClient)
{
    const name = params[0], normalised = normaliseRole(params[0]), joinable = params[1].toLowerCase() !== "false"

    if (!message.guild.hasRole(normalised))
        return Promise.reject(`Unable to find role ${name} in guild ${message.guild.name}`)

    if (joinable && message.guild.joinableRoles.find(x => x === normalised))
        return Promise.reject(`Role ${name} already joinable`)

    if (joinable)
        message.guild.joinableRoles.push(normalised)
    else
        message.guild.joinableRoles = message.guild.joinableRoles.filter(x => x !== normalised)
        
    return Promise.resolve(`Role ${name} is now ${!joinable ? "no longer " : ""}joinable`)
}

module.exports = new Command(
    /*name*/            "set-joinable",
    /*description*/     "Set a role as joinable and leavable",
    /*syntax*/          "set-joinable <rolename> [true/false]",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke
)