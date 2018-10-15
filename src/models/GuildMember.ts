import { GuildMember as DGuildMember, fromDiscord } from "disharmony"
import { Role } from "discord.js";
import { normaliseRole } from "../utilities";

export class GuildMember extends DGuildMember
{
    @fromDiscord public readonly roles: Map<string, Role>
    @fromDiscord public addRole: (snowflake: string) => Promise<object>
    @fromDiscord public removeRole: (snowflake: string) => Promise<object>

    public hasRole(roleName: string)
    {
        for (let role of this.roles.values())
            if (normaliseRole(role.name) === normaliseRole(roleName))
                return true
        return false
    }

    public assignRole(snowflake: string, isJoining: boolean)
    {
        if (isJoining)
            return this.addRole(snowflake)
        else
            return this.removeRole(snowflake)
    }
}