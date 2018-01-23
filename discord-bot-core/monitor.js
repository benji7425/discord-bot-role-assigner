const { fork } = require("child_process");
const CronJob = require("cron").CronJob;
const DiscordUtil = require("./Util.js");
// @ts-ignore
const InternalConfig = require("./internal-config.json");

let instance;

restart();

new CronJob(InternalConfig.restartSchedule, restart, null, true);

function restart() {
	ensureKilledInstance()
		.then(bootstrapNewInstance)
		.catch(DiscordUtil.dateError);
}

function bootstrapNewInstance() {
	instance = fork(process.argv[2]);
}

function ensureKilledInstance() {
	return new Promise((resolve, reject) => {
		if (instance) {
			instance.kill();
			DiscordUtil.dateLog(`Killed existing instance for scheduled restart in ${InternalConfig.restartTimeout / 1000} sec`);
			setTimeout(resolve, InternalConfig.restartTimeout);
		}
		else
			resolve();
	});
}