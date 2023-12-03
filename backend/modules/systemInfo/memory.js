'use strict';

const os = require('os');
/**
 * Convert a byte length to a human readable string.
 * @param byteLen - The amount of memory in bytes.
 * @returns A string with the memory size in MB or GB.
 */
function memoryString(byteLen) {
	// get MB
	let mem = byteLen / 1024 / 1024;
	if (mem.toFixed() >= 1000) {
		// Convert to GB
		mem = (mem / 1024).toFixed(2);
		return `${mem}GB`;
	}
	mem = mem.toFixed(2);

	return `${mem}MB`;
}
// const si = require('systeminformation');
// si.mem().then((data) => console.log(data));
// si.memLayout().then((data) => console.log(data));

module.exports = memoryString;
