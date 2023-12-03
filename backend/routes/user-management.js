const express = require('express');
const router = express.Router();
const db = require('../database/index');
const { encrypt, decrypt } = require('../modules/crypto');
const { checkPrivileges } = require('../modules/check_privileges');
const getUserOnDbByUserId = require('../modules/database/getUserOnDbByUserId');
router.get('/get', (req, res) => {
	if (!req.session.user) {
		res.status(400).send({
			msg: 'Nicht angemeldet',
			code: 102,
		});
		return;
	}

	if (!checkPrivileges(req.baseUrl + req.path, req.session.user.role)) {
		res.status(400).send({
			msg: 'Berechtigungen fehlen',
			code: 103,
		});
		return;
	}

	const userID = req.query.UserID;
	if (userID === false) {
		res.status(400).send({
			msg: '"UserID" nicht gesetzt',
			code: 109,
		});
		return;
	}

	db.query('SELECT * FROM users WHERE userID = ?', [userID], function (err, result) {
		if (err) {
			console.error(err);
			res.status(500).send({
				msg: 'DB Error',
				code: 401,
				err: err,
			});
			return;
		}
		res.status(200).send({
			msg: 'Daten gesendet',
			code: 201,
			data: encrypt(result),
		});
	});
});

router.patch('/updateRole', (req, res) => {
	if (!req.session.user) {
		res.status(400).send({
			msg: 'Nicht angemeldet',
			code: 102,
		});
		return;
	}
	const userID = decrypt(req.body.userID);
	const role = decrypt(req.body.role);
	if (userID === false || role === false) {
		res.status(400).send({
			msg: 'Anfrage nicht gültig',
			code: 101,
		});
		return;
	}

	db.query('SELECT role FROM users WHERE userID = ?', [userID], (err, result) => {
		if (err) {
			console.error(err);
			res.status(500).send({
				msg: 'DB Error',
				code: 401,
				err: err,
			});
			return;
		}

		if (result.length !== 1) {
			res.status(400).send({
				msg: 'Benutzer nicht gefunden',
				code: 110,
			});
			return;
		}

		if (
			!checkPrivileges(req.baseUrl + req.path, req.session.user.role, false, {
				newRole: role,
				oldRole: result[0].role,
			})
		) {
			res.status(400).send({
				msg: 'Berechtigungen fehlen',
				code: 103,
			});
			return;
		}

		db.query('UPDATE users SET role = ? WHERE userID = ?', [role, userID], (err2, result2) => {
			if (err2) {
				console.error(err2);
				res.status(500).send({
					msg: 'DB Error',
					code: 401,
					err: err,
				});
				return;
			}
			res.status(200).send({
				msg: 'Benutzer geändert',
				code: 205,
			});
		});
	});
});

router.get('/list', (req, res) => {
	if (!req.session.user) {
		res.status(400).send({
			msg: 'Nicht angemeldet',
			code: 102,
		});
		return;
	}

	if (!checkPrivileges(req.baseUrl + req.path, req.session.user.role)) {
		res.status(400).send({
			msg: 'Berechtigungen fehlen',
			code: 103,
		});
		return;
	}

	db.query('SELECT username, name, lastname, email, role FROM users', function (err, result) {
		if (err) {
			console.error(err);
			res.status(500).send({
				msg: 'DB Error',
				code: 401,
				err: err,
			});
			return;
		}
		res.status(200).send({
			msg: 'Daten gesendet',
			code: 201,
			data: encrypt(result),
		});
	});
});

router.post('/changePassword', async (req, res) => {
	const userID = decrypt(req.body.userID);
	const password = decrypt(req.body.password);
	if (password === false || userID == false) {
		res.status(400).send({
			msg: 'Anfrage nicht gültig',
			code: 101,
		});
		return;
	}
	const user = await getUserOnDbByUserId(userID);
	if (user.result === 0) {
		res.status(400).send({
			msg: 'Benutzer nicht gefunden',
			code: 110,
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

		const transporter = nodemailer.createTransport(config.mailAuth[0]);
		const html = fs.readFileSync('htmlMail/forgotPassword.html').toString();
		const mailOptions = {
			from: {
				name: 'OSZ-Teltow Filmarchiv Passwort vergessen',
				address: config.mailAuth[0].auth.user,
			},
			to: user.data.email,
			subject: 'Filmarchiv Passwort Änderung',
			html: html.replace('${__NAME__}', user.data.lastname).replace('${__HOST__}', config.frontend_host).replace('${__TOKEN__}', token),
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
				msg: 'E-Mail gesendet',
				code: 211,
			});
		});
	});
});

router.delete('/delete', (req, res) => {
	if (!req.session.user) {
		res.status(400).send({
			msg: 'Nicht angemeldet',
			code: 102,
		});
		return;
	}

	if (!checkPrivileges(req.baseUrl + req.path, req.session.user.role)) {
		res.status(400).send({
			msg: 'Berechtigungen fehlen',
			code: 103,
		});
		return;
	}

	const userID = decrypt(req.body.UserID);
	if (userID === false) {
		res.status(400).send({
			msg: '"UserID" nicht gesetzt',
			code: 109,
		});
		return;
	}

	db.query('DELETE FROM users WHERE userID = ?', [userID], (err, result) => {
		if (err) {
			console.error(err);
			res.status(500).send({
				msg: 'DB Error',
				code: 401,
				err: err,
			});
			return;
		}
		res.status(200).send({
			code: 206,
			msg: 'Benutzer gelöscht',
		});
	});
});

module.exports = router;
