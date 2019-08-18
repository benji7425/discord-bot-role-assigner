import { Collection, Role } from "discord.js"
import { BotGuild } from "disharmony"
import { normaliseRole } from "../utilities"
import Invite from "./invite"

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

    get configuredInvites(): Invite[]
    {
        if (!this.record.invites)
            this.record.invites = []
        return this.record.invites
    }
    set configuredInvites(value: Invite[]) { this.record.invites = value }

    public hasRole(roleName: string)
    {
        for (const role of this.roles.values())
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
        for (const role of this.roles)
            if (role[1].name === name)
                return role[0]
    }
}