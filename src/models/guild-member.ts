import { BotGuildMember } from "disharmony"
import { normaliseRole } from "../utilities"

export class GuildMember extends BotGuildMember
{
    get roles() { return this.djs.roles }

    public hasRole(roleName: string)
    {
        for (const role of this.roles.values())
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