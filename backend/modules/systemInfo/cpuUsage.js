/**
 * It returns a promise that resolves to the CPU usage of the current process
 * @returns A promise that resolves to the CPU usage of the machine.
 */
const osUtil = require('os-utils');

const getCpuUsage = () => {
	return new Promise((resolve) => {
		osUtil.cpuUsage((val) => {
			resolve(Math.round(val * 100));
		});
	});
};

module.exports = getCpuUsage;
