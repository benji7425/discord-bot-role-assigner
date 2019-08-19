import { Command, CommandRejection, PermissionLevel } from "disharmony"
import { Message } from "../models/message"

async function invoke(params: string[], message: Message)
{
    const roleName = params[0]

    if (message.member.hasRole(roleName))
        throw new CommandRejection("You already have that role!")

    if (!message.guild.hasJoinableRole(roleName))
        throw new CommandRejection("You are not permitted to join/leave that role")

    const roleSnowflake = message.guild.getRoleSnowflake(name)

    if (!roleSnowflake)
        throw new CommandRejection("Unable to find that role in this guild")

    await message.member.removeRole(roleSnowflake)

    return `You have joined the role ${roleName}`
}

export default new Command(
    /*syntax*/          "joinrole <rolename>",
    /*description*/     "Join a role",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke,
)