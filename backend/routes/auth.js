const express = require('express');
const router = express.Router(); // Creating a router object.
const db = require('../database/index');
const { decrypt, encrypt } = require('../modules/crypto');
const bcrypt = require('bcrypt');
const { isEmail, checkUsername } = require('../modules/check_userOrEmail');
const { clearAllcookie, getSessionIDCookie } = require('../modules/cookie');
const crypto = require('crypto');
const config = require('../config/config');
const nodemailer = require('nodemailer');
const checkEmailOnDB = require('../modules/database/checkEmailOnDB');
const { checkUserTokenOnDB, setUserTokenOnDB } = require('../modules/database/userTokenOnDB');
const changePassword = require('../modules/database/changePassword');
const fs = require('fs');

const saltRounds = 10; // The number of rounds to use when generating a salt

router.post('/register', function (req, res) {
	let name = decrypt(req.body.name);
	let lastname = decrypt(req.body.lastname);
	let username = decrypt(req.body.username);
	let email = decrypt(req.body.email);
	let password = decrypt(req.body.password);

	if (name === false || lastname === false || username === false || email === false || password === false) {
		res.status(400).send({
			msg: 'Anfrage nicht gültig',
			code: 101,
		});
		return;
	}
	username = username.toLowerCase();
	email = email.toLowerCase();

	if (!isEmail(email)) {
		res.status(400).send({
			msg: 'E-Mail existiert nicht',
			code: 105,
		});
		return;
	}

	if (!checkUsername(username)) {
		res.status(400).send({
			msg: 'Benutzername hat ungültige Zeichen',
			code: 107,
		});
		return;
	}

	if (password.length < 8) {
		res.status(400).send({
			msg: 'Kennwort Mindestlänge ist 8 Zeichen',
			code: 106,
		});
		return;
	}

	db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], function (err, result) {
		if (err) {
			console.error(err);
			res.status(500).send({
				msg: 'DB Error',
				code: 401,
				err: err,
			});
			return;
		}

		if (result.length != 0) {
			res.status(500).send({
				msg: 'Benutzername oder E-Mail bereits registriert',
				code: 104,
			});
			return;
		}

		bcrypt.hash(password, saltRounds, function (err2, hash) {
			if (err2) {
				console.error(err2);
				res.status(500).send({
					msg: 'Bycrypt Error',
					code: 402,
					err: err2,
				});
				return;
			}

			db.query('INSERT INTO users (name, lastname, username, email, password ) VALUE (?,?,?,?,?)', [name, lastname, username, email, hash], function (error, response) {
				if (error) {
					console.error(error);
					res.status(500).send({
						msg: 'DB Error',
						code: 401,
						err: error,
					});
					return;
				}

				res.status(200).send({
					msg: 'Benutzer registriert',
					code: 202,
				});
			});
		});
	});
});

router.post('/login', function (req, res) {
	let email = decrypt(req.body.email);
	const password = decrypt(req.body.password);
	let userOrEmail = 'username';

	if (email === false || password === false) {
		res.status(400).send({
			msg: 'Anfrage nicht gültig',
			code: 101,
		});
		return;
	}

	if (isEmail(email)) {
		userOrEmail = 'email';
	} else if (!checkUsername(email)) {
		res.status(500).send({
			msg: 'Benutzername/E-Mail oder Passwort falsch',
			code: 108,
		});
		return;
	}
	email = email.toLowerCase();

	db.query('SELECT * FROM users WHERE ' + userOrEmail + ' = ?', [email], function (err, result) {
		if (err) {
			console.error(err);
			res.status(500).send({
				msg: 'DB Error',
				code: 401,
				err: err,
			});
			return;
		}

		if (result.length == 0) {
			res.status(500).send({
				msg: 'Benutzername/E-Mail oder Passwort falsch',
				code: 108,
			});
			return;
		}

		bcrypt.compare(password, result[0].password, function (error, response) {
			if (error) {
				console.error(err);
				res.status(500).send({
					msg: 'Bycrpt Error',
					code: 402,
					err: error,
				});
				return;
			}

			if (response == false) {
				res.status(400).send({
					msg: 'Benutzername/E-Mail oder Passwort falsch',
					code: 108,
				});
				return;
			}

			if (req.session.user) {
				res.status(200).send({
					msg: 'Benutzer eingelogt',
					code: 203,
					data: encrypt(req.session.user),
				});
				return;
			}

			getSessionIDCookie(req, res);
			req.session.user = {
				name: result[0].name,
				lastname: result[0].lastname,
				userID: result[0].userID,
				username: email,
				role: result[0].role,
			};

			res.status(200).send({
				msg: 'Benutzer eingelogt',
				code: 203,
				data: encrypt(req.session.user),
			});
		});
	});
});

router.post('/forgetpassword', async (req, res) => {
	const email = decrypt(req.body.email);
	if (email === false) {
		res.status(400).send({
			msg: 'Anfrage nicht gültig',
			code: 101,
		});
		return;
	}

	const user = await checkEmailOnDB(email);
	if (user.result === 0) {
		// FAKE RESPONSE
		res.status(200).send({
			msg: `E-Mail gesendet`,
			code: 211,
		});
		return;
	}
	if (user.result === 1) {
		// DB Error
		console.error(user.err);
		res.status(500).send({
			msg: 'DB Error',
			code: 401,
			err: user.err,
		});
		return;
	}
	// Generate a token and send it to the user's email
	const token = crypto.randomBytes(1000).toString('hex');
	const transporter = nodemailer.createTransport(config.mailAuth[0]);
	const html = fs.readFileSync('htmlMail/forgotPassword.html').toString();
	const mailOptions = {
		from: {
			name: 'OSZ-Teltow Filmarchiv Passwort vergessen',
			address: config.mailAuth[0].auth.user,
		},
		to: email,
		subject: 'Filmarchiv Passwort Änderung',
		html: html.replace('${__NAME__}', user.data.lastname).replace('${__HOST__}', config.frontend_host).replace('${__TOKEN__}', token),
	};
	transporter.sendMail(mailOptions, async (err, info) => {
		if (err) {
			console.error(err);
			res.status(400).send({
				msg: `Mail Error`,
				code: 403,
				err: err,
			});
			return;
		}
		const isSetUserTokenOnDB = await setUserTokenOnDB(token, email);
		if (isSetUserTokenOnDB.result === 0) {
			res.status(400).send({
				msg: 'Benutzer nicht gefunden',
				code: 110,
			});
			return;
		}
		if (isSetUserTokenOnDB.result === 1) {
			//DB Error
			console.error(user.err);
			res.status(500).send({
				msg: 'DB Error',
				code: 401,
				err: user.err,
			});
			return;
		}
		res.status(200).send({
			msg: `E-Mail gesendet`,
			code: 211,
		});
	});
});

router.get('/forgetpassword/:token', async (req, res) => {
	const token = req.params.token;
	const user = await checkUserTokenOnDB(token);
	if (user.result === 0) {
		res.status(400).send({
			msg: 'Token nicht gefunden',
			code: 117,
		});
		return;
	}
	if (user.result === 1) {
		//DB Error
		console.error(user.err);
		res.status(500).send({
			msg: 'DB Error',
			code: 401,
			err: user.err,
		});
		return;
	}
	res.status(200).send({
		data: encrypt(user.data),
		msg: 'Daten gesendet',
		code: 201,
	});
});

router.post('/forgetpassword/:token', async (req, res) => {
	const token = req.params.token;
	const password = decrypt(req.body.password);

	if (password === false) {
		res.status(400).send({
			msg: 'Anfrage nicht gültig',
			code: 101,
		});
		return;
	}

	const user = await checkUserTokenOnDB(token);
	if (user.result === 0) {
		res.status(400).send({
			msg: 'Token nicht gefunden',
			code: 117,
		});
		return;
	}
	if (user.result === 1) {
		//DB Error
		console.error(user.err);
		res.status(500).send({
			msg: 'DB Error',
			code: 401,
			err: user.err,
		});
		return;
	}

	if (password.length < 8) {
		res.status(400).send({
			msg: 'Kennwort Mindestlänge ist 8 Zeichen',
			code: 106,
		});
		return;
	}

	bcrypt.hash(password, saltRounds, async (err2, hashPassword) => {
		if (err2) {
			console.error(err2);
			res.status(500).send({
				msg: 'Bycrypt Error',
				code: 402,
				err: err2,
			});
			return;
		}
		const passwordChanged = await changePassword(user.data.email, hashPassword);
		if (passwordChanged.result === 0) {
			res.status(400).send({
				msg: 'Benutzer nicht gefunden',
				code: 110,
			});
			return;
		}
		if (passwordChanged.result === 1) {
			//DB Error
			console.error(passwordChanged.err);
			res.status(500).send({
				msg: 'DB Error',
				code: 401,
				err: passwordChanged.err,
			});
			return;
		}
		const isSetUserTokenOnDB = await setUserTokenOnDB(null, user.data.email);
		if (isSetUserTokenOnDB.result === 0) {
			res.status(400).send({
				msg: 'Benutzer nicht gefunden',
				code: 110,
			});
			return;
		}
		if (isSetUserTokenOnDB.result === 1) {
			//DB Error
			console.error(isSetUserTokenOnDB.err);
			res.status(500).send({
				msg: 'DB Error',
				code: 401,
				err: isSetUserTokenOnDB.err,
			});
			return;
		}
		const transporter = nodemailer.createTransport(config.mailAuth[0]);
		const html = fs.readFileSync('htmlMail/changedPassword.html').toString();
		const mailOptions = {
			from: {
				name: 'OSZ-Teltow Filmarchiv Passwort vergessen',
				address: config.mailAuth[0].auth.user,
			},
			to: user.data.email,
			subject: 'Filmarchiv Passwort Änderung erfolgreich',
			html: html.replace('${__NAME__}', user.data.lastname),
		};
		transporter.sendMail(mailOptions, async (err) => {
			if (err) {
				console.error(err);
				res.status(400).send({
					msg: 'Mail Error',
					code: 403,
					err: err,
				});
				return;
			}

			res.status(200).send({
				msg: `E-Mail gesendet`,
				data: encrypt(user.data.email),
				code: 211,
			});
		});
	});
});

router.get('/logout', function (req, res, next) {
	req.session.destroy();
	clearAllcookie(req, res);
	res.status(200).send({
		msg: 'Benutzer abgemeldet',
		code: 204,
	});
	next();
});

module.exports = router;
