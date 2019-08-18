import { Collection, Role } from "discord.js"
import { BotGuild } from "disharmony"
import { normaliseRole } from "../utilities"
import Invite from "./invite"

export class Guild extends BotGuild
{
    get roles(): Collection<string, Role> { return this.djs.roles }

    public joinableRoles: string[]
    public configuredInvites: Invite[]

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
        return null
    }

    public loadRecord(record: any)
    {
        this.joinableRoles = record.joinableRoles || []
        this.configuredInvites = record.configuredInvites || []
        super.loadRecord(record)
    }

    public toRecord()
    {
        this.record.joinableRoles = this.joinableRoles
        this.record.configuredInvites = this.configuredInvites
        return super.toRecord()
    }
}