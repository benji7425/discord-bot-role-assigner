import configureInvite from "./configure-invite"
import deprecatedAllow from "./deprecated/allow"
import deprecatedDisallow from "./deprecated/disallow"
import join from "./join"
import leave from "./leave"
import setJoinable from "./set-joinable"
import viewInvites from "./view-invites"
import viewRoles from "./view-roles"

export default [
    setJoinable,
    join,
    leave,
    viewRoles,
    configureInvite,
    viewInvites,
    deprecatedAllow,
    deprecatedDisallow,
]