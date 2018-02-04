const Core = require("../../core");

module.exports = class InviteData extends Core.BaseEmbeddedData {
    constructor() {
        super();

        this.inviteID = String;
        this.roleID = String;
        this.uses = Number;
    }

    toString() {
        return `\`\`\`JavaScript\n ${JSON.stringify(this)}\`\`\``;
    }
};