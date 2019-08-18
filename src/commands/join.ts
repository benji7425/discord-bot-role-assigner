import { BotMessage, Command, PermissionLevel } from "disharmony"
import assign from "../core/assign-role"

async function invoke(params: string[], message: BotMessage)
{
    return assign(params[0], message, true)
}

export default new Command(
    /*syntax*/          "joinrole <rolename>",
    /*description*/     "Join a role",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke,
)