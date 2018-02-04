function manageRole(guild, guildData, member, roleName, isJoining) {
    return new Promise((resolve, reject) => {
        const normalisedName = normaliseRoleName(roleName);
        const role = parseRole(guild, normalisedName);

        if (!role)
            return reject("Role not found");

        if (guildData.allowedRoles.includes(normalisedName)) {
            if (isJoining)
                member.addRole(role).then(() => resolve("The role has been added")).catch(() => reject("Error adding role, ensure the bot has \"Manage roles\" permission and is higher in the list than the role you're trying to join."));
            else
                member.removeRole(role).then(() => resolve("The role has been removed")).catch(() => reject("Error removing role, ensure the bot has \"Manage roles\" permission and is higher in the list than the role you're trying to join."));
        }
        else
            reject("You are not permitted to join/leave this role");
    });
}

function normaliseRoleName(roleName) {
    return (roleName || "").toLowerCase().replace(/ /g, "");
}

function parseRole(guild, roleName) {
    return guild.roles.find(x => normaliseRoleName(x.name) === normaliseRoleName(roleName.toLowerCase())) || null;
}

module.exports = {
    manageRole,
    normaliseRoleName,
    parseRole
};