import { Message as DMessage, fromDiscord } from "disharmony"
import { Guild } from "./guild";

export class Message extends DMessage
{
    @fromDiscord public readonly guild: Guild
}