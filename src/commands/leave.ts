import { Message } from "../models/message";
import { PermissionLevel, Command } from "disharmony";
import assign from "./assign";

async function invoke(params: string[], message: Message)
{
    return assign(params[0], message, false)
}

module.exports = new Command(
    /*name*/            "leaverole",
    /*description*/     "Leave a role",
    /*syntax*/          "leaverole <rolename>",
    /*permissionLevel*/ PermissionLevel.Anyone,
    /*invoke*/          invoke
)