const https = require('https');
const http = require('http');
const fs = require('fs');
const os = require('os');
const config_data = require('../../.config/config.json');
// Add some values to the port as the port number for http and ws
const hostname = os.hostname();
const name = config_data.name;
const port = config_data.port || portAppend;
const isHttps = config_data.https;
//-------------------------------------------------------
//|| ===== *** Initiate http or https server *** ====== ||
//-------------------------------------------------------
var httpServer;
module.exports = (app) => {

	if (isHttps) {
		// set https
		var ssl_keys = config_data.ssl_keys;
		var ssl_cert = '';
		var ssl_key = '';
		// console.log(ssl_keys);
		if (ssl_keys === undefined || ssl_keys.length <= null) {
			exec('bash ./generate-ssl.bash', (err, stdout, stderr) => {
				if (err) {
					// console.log(err);
					return;
				}
				// the *entire* stdout and stderr (buffered)
				console.log(`stdout: ${ stdout }`);
				console.log(`stderr: ${ stderr }`);
			});
			ssl_cert = path.join(__dirname, '../.config/ssl/server.crt');
			ssl_key = path.join(__dirname, '../.config/ssl/server.key');
		} else {
			ssl_keys = ssl_keys[0];
			ssl_cert = ssl_keys.cert || path.join(__dirname, '../.config/ssl/server.crt');
			ssl_key = ssl_keys.key || path.join(__dirname, '../.config/ssl/server.key');
		}
		// console.log(`ss ssl_cert: ${ssl_cert}`, ssl_key);
		httpServer = https.createServer(
			// Provide the private and public key to the server by reading each
			// file's content with the readFileSync() method.
			{
				key: fs.readFileSync(ssl_key, 'utf8'),
				cert: fs.readFileSync(ssl_cert, 'utf8')
			},
			app
		);
		httpServer.listen(port, (err) => {
			if (err) {
				throw err;
			} else {
				console.log(`🛰️ Monitor Server running in the https://${ hostname }:${ port }`);
			}
		});
	} else {
		httpServer = http.createServer(app);
		httpServer.listen(port, () => {
			console.log(`🛰️  Monitor Server running in the http://${ hostname }:${ port }`);
		});
	}
	module.exports = httpServer;
};
