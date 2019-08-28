import { Command, PermissionLevel } from "disharmony"
import updateRole from "../core/role-updater"
import { Message } from "../models/message"

async function invoke(params: string[], message: Message)
{
    return updateRole(params[0], message, true)
}

export default new Command(
    /*syntax*/          "joinrole <rolename>",
    /*description*/     "Join a role",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke,
)
