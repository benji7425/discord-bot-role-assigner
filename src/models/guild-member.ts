import { BotGuildMember } from "disharmony"
import { normaliseRole } from "../utilities"

export class GuildMember extends BotGuildMember
{
    get roles() { return this.djsGuildMember.roles }
    addRole(snowflake: string) { this.djsGuildMember.addRole(snowflake) }
    removeRole(snowflake: string) { this.djsGuildMember.removeRole(snowflake) }

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