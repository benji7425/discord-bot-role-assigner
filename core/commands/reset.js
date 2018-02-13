const Command = require("../command.js");
const Util = require("../util.js");

module.exports = new Command({
    name: "reset",
    description: "Reset all data for this Discord server. WARNING: YOU WILL LOSE ALL YOUR SETTINGS!",
    syntax: "reset",
    admin: true,
    invoke
});

function invoke({ guildData, client, message }) {
    return new Promise((resolve, reject) => {
        /* this is a very hacky way of doing this, but when using .resolve()
           the guildData object gets saved back to the database straight away,
           meaning it'd be deleted and instnantly re-created. Using .reject
           means that .save doesn't get called by the parent. Very hacky but works. */

        Util.ask(client, message.channel, message.member, "Are you sure you want to delete all the data for this server? (yes/no)")
            .then(response => {
                if (response.toLowerCase() === "yes")
                    guildData
                        .delete()
                        .then(() => reject("Data for this server successfully deleted"));
                else
                    reject("Guild data was not deleted");
            });
        // .then(() => resolve("Data for this server successfully deleted"))
        // .catch(() => reject("Error deleting data for this server"));
    });
}