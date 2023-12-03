'use strict';

const console = require('console');
const fs = require('fs');

const checkJsonFile = async (json, jsonPath) => {
	if (fs.existsSync(jsonPath)) {
		var data = await readJsonFileAsync(jsonPath);
		if (JSON.parse(JSON.stringify(data)) === JSON.stringify(json)) {
			return json;
		}
		return createJsonFile(json, jsonPath) + 1;
	}
	return createJsonFile(json, jsonPath) + 2;
};

const createJsonFile = (json, jsonPath) => {
	console.log(typeof json === 'object');
	if (json != null ) {
		console.log('new config json');
		let data = JSON.stringify(json);
		console.log('--- 20', data);
		fs.writeFileSync(jsonPath, data, 'utf8', (error) => {
			if (error) {
				console.error('__dirname', line().str, error);
				return false;
			}
			return json;
		});
	} else {
		// console.log('__dirname', line().str, 'error: json is ' + typeof json);
		console.log(typeof json, ' 30');
		return false;
	}
	return false;
};

const readJsonFileAsync = (jsonPath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(jsonPath, 'utf8', (err, data) => {
			if (err) {
				console.log(err);
				reject(false);
			}
			resolve(data);
		});
	});
};

module.exports = { createJsonFile, checkJsonFile, readJsonFileAsync };
