module.exports = class Command {
	/**@param param */
	constructor({ name, description, syntax, admin, invoke }) {
		this.name = name;
		this.description = description;
		this.syntax = syntax;
		this.admin = admin;
		this.invoke = invoke;

		this.expectedParamCount = this.syntax.split(/ +/).length - 1;
	}
};