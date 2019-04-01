import { Message as BotMessage } from "disharmony"
import { Guild } from "./guild";
import { GuildMember } from "./guild-member";
import { Message as DjsMessage } from "discord.js"

export class Message extends BotMessage
{
    readonly guild: Guild
    readonly member: GuildMember

    constructor(djsMessage: DjsMessage)
    {
        super(djsMessage)
        this.guild = new Guild(djsMessage.guild)
        this.member = new GuildMember(djsMessage.member)
    }
}