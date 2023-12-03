const schedule = require('node-schedule');

const [ major, minor ] = process.versions.node.split('.').map(parseFloat);
if (major < 14 || (major === 14 && minor <= 0)) {
	console.log('Please go to nodejs.org and download version 8 or greater. 👌\n ');
	process.exit();
}

//  .---------------- minute (0 - 59)
//  | .------------- hour (0 - 23)
//  | | .---------- day of month (1 - 31)
//  | | | .------- month (1 - 12) OR jan,feb,mar,apr ...
//  | | | | .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
//  | | | | |
//  * * * * * user-name command to be executed
const job = schedule.scheduleJob('0 0 * * *', function() {
	console.log('ich ');
});
