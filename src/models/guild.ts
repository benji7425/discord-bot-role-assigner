import { Guild as DGuild, fromDiscord, serialize } from "disharmony"
import { Role } from "discord.js"
import { normaliseRole } from "../utilities";

export class Guild extends DGuild
{
    @fromDiscord public readonly roles: Map<string, Role>
    @serialize public joinableRoles: string[] = []

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

    constructor()
    {
        super();
        this.joinableRoles = []
    }
}