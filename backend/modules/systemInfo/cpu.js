const si = require('systeminformation');
// si.cpu().then((data) => console.log(data));
// si.cpuFlags().then((data) => console.log(data));
// si.cpuCache().then((data) => console.log(data));
// si.cpuCurrentSpeed().then((data) => console.log(data));
// si.cpuTemperature().then((data) => console.log(data));
/**
 * It takes a timestamp and returns a string representing the time since that timestamp
 * @param time - The time to calculate the uptime from.
 * @returns A string that represents the time difference between the current time and the time passed
 * in.
 */
const totalUptimeString = (time) => {
	const diff = Date.now() - time;
	const seconds = Math.round(diff / 1000);
	if (seconds < 60) {
		return `${seconds}s`;
	}
	const minutes = Math.round(diff / 1000 / 60);
	if (minutes < 60) {
		return `${minutes}m`;
	}
	const hours = Math.round(diff / 1000 / 60 / 60);
	if (hours < 24) {
		return `${hours}h`;
	}
	const days = Math.round(diff / 1000 / 60 / 60 / 24);
	return `${days}d`;
};
module.exports = totalUptimeString;
