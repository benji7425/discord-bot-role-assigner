import { BotGuild } from "disharmony"
import { normaliseRole } from "../utilities";
import { Role, Collection } from "discord.js";

export class Guild extends BotGuild
{
    get roles(): Collection<string, Role> { return this.djs.roles }
    get joinableRoles(): string[]
    {
        if (!this.record.joinableRoles)
            this.record.joinableRoles = []
        return this.record.joinableRoles
    }
    set joinableRoles(value: string[]) { this.record.joinableRoles = value }

    public hasRole(roleName: string)
    {
        for (let role of this.roles.values())
            if (normaliseRole(role.name) === normaliseRole(roleName))
                return true
        return false
    }

    public hasJoinableRole(roleName: string)
    {
        return this.joinableRoles.indexOf(normaliseRole(roleName)) > -1
    }

    public getRoleSnowflake(name: string)
    {
        for (let role of this.roles)
            if (role[1].name === name)
                return role[0]
    }
}