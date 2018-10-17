import { Message } from "../models/message";

export default async function assign(name: string, message: Message, isJoining: boolean)
{
    if (isJoining === message.member.hasRole(name))
        return Promise.reject(`You ${isJoining ? "already" : "don't"} have that role!`)

    if (!message.guild.hasJoinableRole(name))
        return Promise.reject("You are not permitted to join/leave that role")

    await message.member.assignRole(message.guild.getRoleSnowflake(name)!, isJoining)

    return Promise.resolve(`Role successfully ${isJoining ? "joined" : "left"}`)
}