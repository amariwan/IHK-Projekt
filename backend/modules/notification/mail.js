/* eslint no-console: 0 */

'use strict';

const nodemailer = require('nodemailer');
const config = require('../../.config/config.json');

const sendMail = async (to, subject, text) => {
	var auth = config.mailAuth;
	auth = auth[0];
	if (typeof auth === 'object') {
		let transporter = nodemailer.createTransport(auth);
		// Message object
		let message = {
			from: auth.auth.user, // Sender address
			to: to, // List of recipients
			subject: subject, // Subject line
			html: text
		};

		let info = await transporter.sendMail(message, function(err, info) {
			if (err) {
				console.log(err);
			} else {
				console.log(info);
			}
		});

		console.log('Message sent successfully!');
		console.log(nodemailer.getTestMessageUrl(info));

		// only needed when using pooled connections
		transporter.close();
	}
};

sendMail().catch((err) => {
	console.error(err.message);
	process.exit(1);
});

module.exports = sendMail;
