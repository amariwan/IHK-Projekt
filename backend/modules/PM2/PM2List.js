const pm2 = require('pm2');
const { exec } = require('child_process');

/**
 * It returns a promise that resolves to an array of pm2 processes
 * @returns A promise that resolves to an array of objects.
 */
const pm2List = () => {
	return new Promise((resolve) => {
		pm2.list((err, data) => {
			if (err) {
				return resolve([]);
			}
			if (data.length === 0) {
				console.log('I running pm2 update....');
				exec('pm2 update', (err, stdout, stderr) => {
					if (err) {
						console.log(err);
					}
					// the *entire* stdout and stderr (buffered)
					// console.log(`stdout: ${stdout}`);
					// console.log(`stderr: ${stderr}`);
				});
			}
			resolve(data);
		});
	});
};

module.exports = pm2List;
