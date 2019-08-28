import { CommandRejection } from "disharmony"
import { Message } from "../models/message"

/** Attempt to assign/unassign a role to/from a user. Call this from a command. */
export default async function updateRole(roleName: string, message: Message, isJoining: boolean)
{
    if (!message.guild.hasJoinableRole(roleName))
        throw new CommandRejection("You are not permitted to join/leave that role")

    const role = message.guild.getRoleWithNameNormalised(roleName)

    if (!role)
        throw new CommandRejection("Unable to find that role in this guild")

    if (isJoining === !!message.member.djs.roles.get(role.id))
        throw new CommandRejection(`You ${isJoining ? "already" : "don't"} have that role!`)

    if (isJoining)
        await message.member.addRole(role)
    else
        await message.member.removeRole(role)

    return `You have ${isJoining ? "joined" : "left"} the role ${roleName}`
}