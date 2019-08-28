import { Command, PermissionLevel } from "disharmony"
import updateRole from "../core/role-updater"
import { Message } from "../models/message"

async function invoke(params: string[], message: Message)
{
    return updateRole(params[0], message, false)
}

export default new Command(
    /*syntax*/          "leaverole <rolename>",
    /*description*/     "Leave a role",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke,
)
