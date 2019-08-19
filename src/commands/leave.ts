import { BotMessage, Command, CommandRejection, PermissionLevel } from "disharmony"
import { Guild } from "../models/guild"

async function invoke(params: string[], message: BotMessage)
{
    const guild = new Guild(message.guild.djs)
    const roleName = params[0]

    if (message.member.hasRole(roleName))
        throw new CommandRejection("You do not currently have that role!")

    if (!guild.hasJoinableRole(roleName))
        throw new CommandRejection("You are not permitted to join/leave that role")

    const roleSnowflake = guild.getRoleSnowflake(name)

    if (!roleSnowflake)
        throw new CommandRejection("Unable to find that role in this guild")

    await message.member.removeRole(roleSnowflake)

    return `You have left the role ${roleName}`
}

export default new Command(
    /*syntax*/          "leaverole <rolename>",
    /*description*/     "Leave a role",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke,
)