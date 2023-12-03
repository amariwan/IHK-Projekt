const axios = require('axios');

const app = {
	processes: {
		all: 786,
		running: 12,
		blocked: 0,
		sleeping: 764,
		unknown: 0,
		list: [
			{
				pid: 884,
				parentPid: 675,
				name: 'mysqld',
				cpu: 0,
				cpuu: 0,
				cpus: 0,
				mem: 0,
				priority: 20,
				memVsz: 409904528,
				memRss: 6368,
				nice: 0,
				started: '2022-11-29 21:16:27',
				state: 'sleeping',
				tty: '',
				user: 'snow',
				command: 'mysqld',
				params: '--basedir=/opt/homebrew/opt/mysql --datadir=/opt/homebrew/var/mysql --plugin-dir=/opt/homebrew/opt/mysql/lib/plugin --log-error=killer.local.err --pid-file=killer.local.pid',
				path: '/opt/homebrew/opt/mysql/bin',
			},
		],
	},
};

const networkConnections = [
	{
		protocol: 'tcp4',
		localAddress: '127.0.0.1',
		localPort: '4003',
		peerAddress: '127.0.0.1',
		peerPort: '61028',
		state: 'UNKNOWN',
		pid: 146988,
		process: '',
	},
	{
		protocol: 'tcp4',
		localAddress: '127.0.0.1',
		localPort: '61028',
		peerAddress: '127.0.0.1',
		peerPort: '4003',
		state: 'CLOSE_WAIT',
		pid: 24044,
		process: 'Brave Browser Helper',
	},
];

const mem = {
	total: 17179869184,
	free: 142098432,
	used: 17037770752,
	active: 3022356480,
	available: 14157512704,
	buffers: 0,
	cached: 0,
	slab: 0,
	buffcache: 14015414272,
	swaptotal: 13958643712,
	swapused: 13543994818.56,
	swapfree: 414648893.44,
};

const disk = {
	rIO: 34274843,
	wIO: 14290101,
	tIO: 48564944,
	rIO_sec: 245.08886810102902,
	wIO_sec: 0.9354536950420954,
	tIO_sec: 246.02432179607112,
	rWaitTime: 0,
	wWaitTime: 0,
	tWaitTime: 0,
	rWaitPercent: 0,
	wWaitPercent: 0,
	tWaitPercent: 0,
	ms: 1069,
};
const networkStats = [
	{
		iface: 'en0',
		operstate: 'up',
		rx_bytes: 12470029936,
		rx_dropped: 1969,
		rx_errors: 0,
		tx_bytes: 2594405693,
		tx_dropped: 1969,
		tx_errors: 0,
		rx_sec: 361.40018921475877,
		tx_sec: 236.51844843897825,
		ms: 1057,
	},
];

const users = [
	{
		user: 'snow',
		tty: 'console',
		date: '2022-67-ov',
		time: '21:16',
		ip: '',
		command: '-',
	},
];

const battery = {
	hasBattery: true,
	cycleCount: 205,
	isCharging: false,
	designedCapacity: 57608,
	maxCapacity: 50157,
	currentCapacity: 38112,
	voltage: 11.289,
	capacityUnit: 'mWh',
	percent: 80,
	timeRemaining: 92,
	acConnected: false,
	type: 'Li-ion',
	model: '',
	manufacturer: 'Apple',
	serial: '',
};

const cpu = {
	manufacturer: 'Apple',
	brand: 'M1',
	vendor: 'Apple',
	family: '458787763',
	model: '',
	stepping: '2',
	revision: '',
	voltage: '',
	speed: 2.4,
	speedMin: 2.4,
	speedMax: 2.4,
	governor: '',
	cores: 8,
	physicalCores: 8,
	performanceCores: 4,
	efficiencyCores: 4,
	processors: 1,
	socket: 'SOC',
	flags: '',
	virtualization: true,
	cache: {
		l1d: 131072,
		l1i: 65536,
		l2: 4194304,
		l3: null,
	},
};

const versions = {
	kernel: '22.1.0',
	openssl: '1.1.1s',
	systemOpenssl: '3.3.6',
	systemOpensslLib: 'LibreSSL',
	node: '19.2.0',
	v8: '10.8.168.20-node.8',
	npm: '8.19.3',
	yarn: '1.22.19',
	pm2: '5.2.2',
	gulp: ': 2.3.0',
	grunt: '',
	git: '2.38.1',
	tsc: '',
	mysql: '8.0.31',
	redis: '',
	mongodb: '',
	apache: '2.4.54',
	nginx: '',
	php: '8.1.13',
	docker: '',
	postfix: '3.2.2',
	postgresql: '',
	perl: '5.30.3',
	python: '',
	python3: '3.10.8',
	pip: '',
	pip3: '22.2.2',
	java: '',
	gcc: '14.0.0',
	virtualbox: '',
	bash: '3.2.57',
	zsh: '5.9',
	fish: '',
	powershell: '',
	dotnet: '',
};

const os = {
	platform: 'darwin',
	distro: 'macOS',
	release: '13.0.1',
	codename: 'macOS Ventura',
	kernel: '22.1.0',
	arch: 'arm64',
	hostname: 'killer.fritz.box',
	fqdn: 'killer.fritz.box',
	codepage: 'UTF-8',
	logofile: 'darwin',
	serial: '0BFE6A5D-118B-3889-AE2B-D34A0117A062',
	build: '22A400',
	servicepack: '',
	uefi: true,
};

const server = {
	hostname: 'killer.fritz.box',
	cpus: 8,
	cpuUsage: '80',
	cpuUsageCls: false,
	totalmem: '16.00GB',
	freemem: '218.67MB',
	memUsage: '1',
	node_version: 'v19.2.0',
	godid: 33720,
	memory: '0.00MB',
	cpu: '0%',
	restart: 101,
	name: 'index',
	pm_version: 'v0',
	instances: 'x2',
	totalUptime: '0',
	cpuCls: false,
	platform: 'darwin',
	architecture: 'arm64',
};

const data = {
	type: 'CPU',
	unit: 'Percentage',
	state: 'running',
	unit_display: '%',
	value: 56,
	date: new Date(),
	timestamp: Date.now(),
	sensor_name: 'CPU_sensor',
	sensor_type: 'Systeminformation',
	sensor_id: 'cpu',
	maxValue: 100,
	minValue: 0,
};

const totalData = {
	server,
	versions,
	cpu,
	battery,
	users,
	networkStats,
	os,
	mem,
	disk,
	app,
	networkConnections,
	data,
};

console.log(totalData);

axios
	.post('http://localhost:4003/getDataSensore/', totalData)
	.then((response) => {
		console.log('Data sent successfully:', response.data);
	})
	.catch((error) => {
		console.log('Error sending data:', error);
	});
