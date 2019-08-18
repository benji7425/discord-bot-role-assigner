import { Command, PermissionLevel } from "disharmony"
import { Message } from "../models/message"
import { normaliseRole } from "../utilities"

function invoke(params: string[], message: Message)
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

export default new Command(
    /*syntax*/          "set-joinable <rolename> [true/false]",
    /*description*/     "Set a role as joinable and leavable",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke,
)