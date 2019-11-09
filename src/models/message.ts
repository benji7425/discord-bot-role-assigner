import { Message as DjsMessage } from "discord.js"
import { DisharmonyMessage } from "disharmony"
import { Guild } from "./guild"

export class Message extends DisharmonyMessage
{
    public readonly guild: Guild

    constructor(djsMessage: DjsMessage)
    {
        super(djsMessage)
        this.guild = new Guild(djsMessage.guild)
    }
}