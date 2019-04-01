import { Message } from "../models/message";
import Command, { PermissionLevel } from "disharmony/lib/commands/command";
import assign from "./assign";

async function invoke(params: string[], message: Message)
{
    return assign(params[0], message, true)
}

module.exports = new Command(
    /*name*/            "joinrole",
    /*description*/     "Join a role",
    /*syntax*/          "joinrole <rolename>",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke
)