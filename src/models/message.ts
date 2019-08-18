import { Message as DjsMessage } from "discord.js"
import { BotMessage } from "disharmony"
import { Guild } from "./guild"
import { GuildMember } from "./guild-member"

export class Message extends BotMessage
{
    public readonly guild: Guild
    public readonly member: GuildMember

    constructor(djsMessage: DjsMessage)
    {
        super(djsMessage)
        this.guild = new Guild(djsMessage.guild)
        this.member = new GuildMember(djsMessage.member)
    }
}