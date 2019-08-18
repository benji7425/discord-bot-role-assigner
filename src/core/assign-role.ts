import { BotMessage } from "disharmony"
import { Guild } from "../models/guild"

export default async function assign(name: string, message: BotMessage, isJoining: boolean)
{
    const guild = new Guild(message.guild.djs)

    if (isJoining === message.member.hasRole(name))
        return Promise.reject(`You ${isJoining ? "already" : "don't"} have that role!`)

    if (!guild.hasJoinableRole(name))
        return Promise.reject("You are not permitted to join/leave that role")

    const roleSnowflake = guild.getRoleSnowflake(name)

    if (!roleSnowflake)
        return Promise.reject("Error: Unable to find matching snowflake")

    if (isJoining)
        await message.member.addRole(roleSnowflake)
    else
        await message.member.removeRole(roleSnowflake)

    return Promise.resolve(`Role successfully ${isJoining ? "joined" : "left"}`)
}