import { BotMessage, Command, PermissionLevel } from "disharmony"
import assign from "../core/assign-role"

async function invoke(params: string[], message: BotMessage)
{
    return assign(params[0], message, false)
}

export default new Command(
    /*syntax*/          "leaverole <rolename>",
    /*description*/     "Leave a role",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke,
)