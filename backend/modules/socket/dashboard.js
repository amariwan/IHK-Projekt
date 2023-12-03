const pm2 = require('pm2');
const os = require('os');
const fs = require('fs');
const db = require('../database/index');
const si = require('systeminformation');
const pm2List = require('../PM2/PM2List');
const memoryString = require('../systemInfo/memory');
const getCpuUsage = require('../systemInfo/cpuUsage');
const timeString = require('../time');
const hostname = os.hostname();
const cpus = os.cpus().length;
const totalmemNum = os.totalmem();
const totalmem = memoryString(os.totalmem());
const nodev = process.version;
const godid = process.pid;
const cpuThreshold = 90; // CPU Threshold (System)
const {
	exec
} = require('child_process');
const {
	sendMsg
} = require('../notification/discord');
const PM2Control = require('../PM2/control');
const totalUptimeString = require('../systemInfo/cpu');
const getInfo = require('../systemInfo/getInfo');
const memoryUsage = require('../systemInfo/memoryUsage');

// Printing os.platform() value
var platform = os.platform();
module.exports = (io) => {

	// new connection received
	io.on('connection', (socket) => {
		var handshake = socket.handshake;
		if (handshake.headers.cookie) {
			var str = handshake.headers.cookie;
			// console.log(str, '38');
		} else {
			console.log('Missing Cookies');
		}
		// console.log(socket);
		console.log('websocket server connect!');
		// console.log(socket.handshake.headers.cookie);
		// console.log(socket.handshake.headers);
		// if (sessionUser) {
		const timer = setInterval(async () => {
			Promise.all([pm2List(), getCpuUsage(), si.osInfo(), getInfo()]).then((val) => {
				const data = val[0];
				const totalData = {
					hostname,
					cpus,
					cpuUsage: `${val[1]}`,
					cpuUsageCls: val[1] >= cpuThreshold ? true : false,
					totalmem,
					freemem: memoryString(os.freemem()),
					memUsage: '35',
					// memUsage: `${Math.round(os.freemem() * 100 / os.totalmem())}`,
					node_version: nodev,
					godid,
					memory: 0,
					cpu: 0,
					restart: 0,
				};
				let systemInfo = {};
				systemInfo.osInfo = val[2];
				systemInfo.getInfo = val[3];
				systemInfo.memoryUsage = val[4];
				if (data && data.length > 0) {
					const processData = [];
					let totalUptime;
					let instances = 0;
					data.forEach((t) => {
						const memory = t.monit ? Number(t.monit.memory) : 0;
						totalData.memory += memory;
						instances++;
						const cpu = t.monit ? Math.min(parseInt(t.monit.cpu), 100) : 0;
						totalData.cpu = totalData.cpu + cpu;
						totalData.name = t.name;
						totalData.pm_version = `v${t.pm2_env._pm2_version || 0}`;
						totalData.restart += t.pm2_env.restart_time;

						// boot mode
						let mode = t.pm2_env.exec_mode;
						if (mode.indexOf('_mode') > 0) {
							mode = mode.substring(0, mode.indexOf('_mode'));
						}

						let processUptime = '-';
						if (t.pm2_env.status === 'online') {
							processUptime = timeString(t.pm2_env.pm_uptime);

							// Take the smallest uptime
							if (!totalUptime) {
								totalUptime = t.pm2_env.pm_uptime;
							} else if (totalUptime > t.pm2_env.pm_uptime) {
								totalUptime = t.pm2_env.pm_uptime;
							}
						}
						processData.push({
							name: t.name,
							mode,
							pmid: t.pm_id,
							pid: t.pid,
							memory: memoryString(memory),
							cpu: `${cpu}%`,
							cpuCls: cpu >= cpuThreshold ? true : false,
							uptime: processUptime,
							restart: t.pm2_env.restart_time,
							status: t.pm2_env.status,
							user: t.pm2_env.username,
						});
					});
					totalData.instances = `x${instances}`;
					totalData.totalUptime = totalUptime ? totalUptimeString(totalUptime) : '0';
					totalData.cpu = `${Math.round(totalData.cpu / instances)}%`;
					totalData.cpuCls = Math.round(totalData.cpu / instances) >= cpuThreshold ? true : false;
					totalData.memory = memoryString(totalData.memory / instances);
					totalData.platform = platform;
					totalData.architecture = os.arch();
					totalData.userInfo = os.userInfo();
					totalData.release = os.release();
					totalData.version = os.version();
					totalData.networkInterFaces = os.networkInterfaces();
					socket.emit('dashboard', {
						totalData,
						processData,
						systemInfo,
						getInfo
					});
				} else {
					socket.emit('dashboard', {
						totalData,
						systemInfo
					});
				}
			});
		}, socket.handshake.query.interval || 1000);

		// After disconnecting, clear the timer
		socket.on('startApp', (appName) => {
			pm2.start(appName, (err, x) => {
				if (err) return socket.emit('serverInfo', 'error', err);
				else socket.emit('serverInfo', 'success', x[0].name + ' ' + x[0].status);
			});
		});
		// After disconnecting, clear the timer
		socket.on('restartApp', (appName) => {
			pm2.restart(appName, (err, x) => {
				if (err) return socket.emit('serverInfo', 'error', err);
				else socket.emit('serverInfo', 'success', x[0].name + ' ' + x[0].status);
			});
		});
		// After disconnecting, clear the timer
		socket.on('deleteApp', (appName) => {
			pm2.delete(appName, (err, x) => {
				if (err) return socket.emit('serverInfo', 'error', err);
				else socket.emit('serverInfo', 'success', x[0].name + ' ' + x[0].status);
			});
		});
		// After disconnecting, clear the timer
		socket.on('stopApp', (appName) => {
			PM2Control(appName, 'stop');
			// pm2.stop(appName, (err, x) => {
			// 	if (err) return socket.emit('serverInfo', 'error', err);
			// 	else socket.emit('serverInfo', 'success', x[0].name + ' ' + x[0].status);
			// 	sendMsg('serverInfo ' + 'success ' + x[0].name + ' ' + x[0].status);
			// });
		});
		socket.on('test', (value) => {
			socket.emit('serverInfo', value);
		});
		// After disconnecting, clear the timer
		socket.on('disconnect', () => {
			console.log('disconnect!');
			clearInterval(timer);
		});

	});
}
