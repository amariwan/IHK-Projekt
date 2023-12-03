const pm2 = require('pm2');
const { sendMsg } = require('../notification/discord');

const PM2Control = (appName, type) => {
	var result;
	if (typeof appName != 'string' || appName != null || typeof type == 'string' || type != null) {
		switch (type) {
			case 'stop':
				pm2.stop(appName, (err, x) => {
					if (err) return (result = err);
					else result = x[0].name + ' ' + x[0].status;
					sendMsg('serverInfo ' + 'success ' + x[0].name + ' ' + x[0].status);
				});
				break;
			case 'start':
				pm2.start(appName, (err, x) => {
					if (err) return (result = err);
					else result = x;
					sendMsg('serverInfo ' + 'success ' + x);
				});
				break;

			case 'restart':
				pm2.restart(appName, (err, x) => {
					if (err) return (result = err);
					else result = x[0].name + ' ' + x[0].status;
					sendMsg('serverInfo ' + 'success ' + x[0].name + ' ' + x[0].status);
				});
				break;
			case 'delete':
				pm2.delete(appName, (err, x) => {
					if (err) return (result = err);
					else result = x[0].name + ' ' + x[0].status;
					sendMsg('serverInfo ' + 'success ' + x[0].name + ' ' + x[0].status);
				});
				break;
			default:
				break;
		}
	}
	return result;
};

module.exports = PM2Control;
