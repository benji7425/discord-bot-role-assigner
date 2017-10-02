const Core = require("../discord-bot-core");
const GuildData = require("./models/guild-data.js");

const token = require("../" + process.argv[2]).token,
	dataFile = process.argv[3];

const client = new Core.Client(token, dataFile, __dirname + "/commands", GuildData);

client.bootstrap();