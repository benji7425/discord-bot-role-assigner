import { BotMessage, Command, CommandRejection, PermissionLevel } from "disharmony"
import { Guild } from "../models/guild"
import { normaliseRole } from "../utilities"

async function invoke(params: string[], message: BotMessage)
{
    const name = params[0], normalised = normaliseRole(params[0]), joinable = params[1].toLowerCase() !== "false"

    const guild = new Guild(message.guild.djs)

    if (!guild.hasRole(normalised))
        throw new CommandRejection(`Unable to find role ${name} in guild ${guild.name}`)

    if (joinable && guild.joinableRoles.find(x => x === normalised))
        throw new CommandRejection(`Role ${name} already joinable`)

    if (joinable)
        guild.joinableRoles.push(normalised)
    else
        guild.joinableRoles = guild.joinableRoles.filter(x => x !== normalised)

    return `Role ${name} is now ${!joinable ? "no longer " : ""}joinable`
}

export default new Command(
    /*syntax*/          "set-joinable <rolename> [true/false]",
    /*description*/     "Set a role as joinable and leavable",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke,
)