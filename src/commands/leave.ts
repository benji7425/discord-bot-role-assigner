import { Command, CommandRejection, PermissionLevel } from "disharmony"
import { Message } from "../models/message"

async function invoke(params: string[], message: Message)
{
    const roleName = params[0]

    if (message.member.hasRole(roleName))
        throw new CommandRejection("You do not currently have that role!")

    if (!message.guild.hasJoinableRole(roleName))
        throw new CommandRejection("You are not permitted to join/leave that role")

    const roleSnowflake = message.guild.getRoleSnowflake(name)

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