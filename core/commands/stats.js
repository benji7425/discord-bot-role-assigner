const Command = require("../command.js");

module.exports = new Command({
    name: "stats",
    description: "Show some stats about the bot",
    syntax: "stats",
    admin: false,
    invoke
});

function invoke({ message, params, guildData, client }) {
    return Promise.resolve(`
        **Server count:** ${client.guilds.size}
        **Cached users:** ${client.users.size}
        **Uptime:** ${toHHMMSS(client.uptime)}
    `);
}

function toHHMMSS(ms) {
    const secsTruncated = Math.trunc(ms / 1000); // don't forget the second param
    const hrs = Math.floor(secsTruncated / 3600);
    const mins = Math.floor((secsTruncated - (hrs * 3600)) / 60);
    const secs = secsTruncated - (hrs * 3600) - (mins * 60);

    let hoursStr = hrs.toString(), minsStr = mins.toString(), secsStr = secs.toString();

    if (hrs < 10) { hoursStr = "0" + hrs; }
    if (mins < 10) { minsStr = "0" + mins; }
    if (secs < 10) { secsStr = "0" + secs; }
    return hoursStr + ":" + minsStr + ":" + secsStr;
}