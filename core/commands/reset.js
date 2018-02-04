const Command = require("../command.js");

module.exports = new Command({
    name: "reset",
    description: "Reset all data for this Discord server. WARNING: YOU WILL LOSE ALL YOUR SETTINGS!",
    syntax: "reset",
    admin: false,
    invoke
});

function invoke({ guildData }) {
    return new Promise((resolve, reject) => {
        /* this is a very hacky way of doing this, but when using .resolve()
           the guildData object gets saved back to the database straight away,
           meaning it'd be deleted and instnantly re-created. Using .reject
           means that .save doesn't get called by the parent. Very hacky but works. */ 
        guildData
            .delete()
            .then(() => reject("Data for this server successfully deleted"));
            // .then(() => resolve("Data for this server successfully deleted"))
            // .catch(() => reject("Error deleting data for this server"));
    });
}