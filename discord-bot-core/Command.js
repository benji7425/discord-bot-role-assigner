module.exports = class Command {
	/**@param param */
	constructor({ name, description, syntax, admin, invoke }) {
		this.name = name;
		this.description = description;
		this.syntax = syntax;
		this.admin = admin;
		this.invoke = invoke;

		const params = this.syntax.split(/ +/);
		const optionalParams = params.filter(x => x.match(/^\[.+\]$/));

		this.maxParamCount = params.length - 1;
		this.expectedParamCount = this.maxParamCount - optionalParams.length;
	}
};