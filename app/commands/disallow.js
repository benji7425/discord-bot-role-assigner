const Core = require("../../core");
const Internal = require("../internals/role-management.js");

module.exports = new Core.Command({
    name: "disallow",
    description: "Disallow users to assign a role to themselves",
    syntax: "disallow <rolename>",
    admin: true,
    invoke: invoke
});

function invoke({ params, guildData }) {
    return new Promise((resolve, reject) => {
        const normalisedName = Internal.normaliseRoleName(params[0]);

        if (guildData.allowedRoles.includes(normalisedName)) {
            const idx = guildData.allowedRoles.indexOf(normalisedName);
            guildData.allowedRoles.splice(idx, 1);
            resolve("Role now disallowed");
        }
        else
            reject("Role was not allowed in the first place");
    });
}