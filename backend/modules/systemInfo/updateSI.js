var si = require('systeminformation');

// Allocating process module
const process = require('process');
function updateSi() {
	// Calling process.cpuUsage() method
	var usage = process.cpuUsage();
	// Printing returned value
	console.log('cpu usage before: ', usage);

	// Current time
	const now = Date.now();

	// Loop to delay almost 100 milliseconds
	while (Date.now() - now < 100);

	// After using the cpu for nearly equal to
	// 100 milliseconds
	// Calling process.cpuUsage() method
	usage = process.cpuUsage(usage);

	// Printing returned value
	console.log('Cpu usage by this process: ', usage);
}

// Schedule update
setInterval(updateSi, 500);
