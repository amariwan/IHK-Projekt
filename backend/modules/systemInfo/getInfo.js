const si = require('systeminformation');

const getInfo = async () => {
	const cpu = await si.cpu();
	const disk = (await si.diskLayout())[0];
	const os = await si.osInfo();
	const versions = await si.versions();
	const ram = await si.mem();

	// CPU Info
	let info = {};
	info.cpu = `${cpu.manufacturer} ${cpu.brand} ${cpu.speed}GHz\n`;
	info.cores = `${cpu.cores} (${cpu.physicalCores} Physical)\n`;

	// RAM Info
	const totalRam = Math.round(ram.total / 1024 / 1024 / 1024);
	info.ram = `${totalRam}GB\n`;

	// Disk Info
	const size = Math.round(disk.size / 1024 / 1024 / 1024);
	info.disk = `${disk.vendor} ${disk.name} ${size}GB ${disk.type} (${disk.interfaceType})\n`;

	//OS Info
	info.os = `${os.distro} ${os.codename} (${os.platform})\n`;
	info.kernel = `${os.kernel} ${os.arch}\n`;

	return info;
};
module.exports = getInfo;
