import { Command, Logger, PermissionLevel } from "disharmony"
import { Message } from "../../models/message"
import SetJoinable from "../set-joinable"

async function invoke(params: string[], message: Message)
{
    await message.reply("The `disallow` command is deprecated, please use the `set-joinable` command instead. It will continue to work for now, but will be removed in future.")
    await Logger.logEvent("DeprecatedCommandInvoked")
    params.push("false")
    return SetJoinable.invoke(params, message, null as any)
}

export default new Command(
    /*syntax*/          "disallow <rolename>",
    /*description*/     "Deprecated!",
    /*permissionLevel*/ PermissionLevel.Admin,
    /*invoke*/          invoke,
    /*hidden*/          true,
)