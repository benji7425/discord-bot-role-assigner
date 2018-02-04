const Camo = require("camo");

module.exports = class BaseGuildData extends Camo.Document {
    constructor() {
        super();

        this.guildID = String;
    }
};