import { Command, CommandRejection, Logger, PermissionLevel } from "disharmony"
import { Message } from "../models/message"
import { normaliseRole } from "../utilities"

async function invoke(params: string[], message: Message)
{
    const name = params[0], normalised = normaliseRole(params[0]), isBecomingJoinable = params[1].toLowerCase() !== "false"

    if (isBecomingJoinable && !message.guild.getRoleWithNameNormalised(normalised))
        throw new CommandRejection(`Unable to find role ${name} in guild ${message.guild.name}`)

    if (isBecomingJoinable && message.guild.joinableRoles.find(x => x === normalised))
        throw new CommandRejection(`Role ${name} already joinable`)

    if (isBecomingJoinable)
        message.guild.joinableRoles.push(normalised)
    else
        message.guild.joinableRoles = message.guild.joinableRoles.filter(x => x !== normalised)

    Logger.logEvent("RoleConfigured")

    return `Role ${name} is now ${!isBecomingJoinable ? "no longer " : ""}joinable`
}

export default new Command(
    /*syntax*/          "set-joinable <rolename> <true/false>",
    /*description*/     "Set a role as joinable and leavable",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke,
)