const Command = require("../Command.js");
const ParentPackageJson = require("../../package.json");

module.exports = new Command({
	name: "version",
	description: "Return version number",
	syntax: "version",
	admin: false,
	invoke
});

function invoke() {
	return Promise.resolve(ParentPackageJson.version);
}