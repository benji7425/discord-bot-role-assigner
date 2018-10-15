import { Message as DMessage, fromDiscord } from "disharmony"
import { Guild } from "./guild";
import { GuildMember } from "./GuildMember";

export class Message extends DMessage
{
    @fromDiscord public readonly guild: Guild
    @fromDiscord public readonly member: GuildMember
}