import { Message as DjsMessage } from "discord.js"
import { BotMessage } from "disharmony"
import { Guild } from "./guild"

export class Message extends BotMessage
{
    public readonly guild: Guild

    constructor(djsMessage: DjsMessage)
    {
        super(djsMessage)
        this.guild = new Guild(djsMessage.guild)
    }
}