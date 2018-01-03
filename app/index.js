const Core = require("../discord-bot-core");
const GuildData = require("./models/guild-data.js");

// @ts-ignore
const client = new Core.Client(require("../token.json"), __dirname + "/commands", GuildData);

client.on("beforeLogin", require("./legacy-upgrader.js"));

client.bootstrap();