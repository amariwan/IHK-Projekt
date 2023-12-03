const express = require('express');
const router = express.Router(); // Creating a router object.
// Add some values to the port as the port number for http and ws

/* Telling the server to saerve the static files in the webUI folder. */
router.get('/', (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
	if (req.session.views) {
		req.session.views++;
	} else {
		req.session.views = 1;
	}
	res.send(`You have visited this page ${req.session.views} times.`);
	// res.status(200).send({
	// 	msg: `Hey u ${JSON(req.session)}`,

	// 	code: 200,
	// });
});

router.get('/login', (req, res) => {
	res.status(200).send({
		msg: 'User already logged in',
		islogged: true,
		code: 200,
	});

=======
>>>>>>> master
	if (req.session.view) {
		// The next time when user visits,
		// he is recognized by the cookie
		// and variable gets updated.
		req.session.view++;
		res.status(200).send({
			msg: 'You visited this page for ' + req.session.view + ' times',
			code: 200,
		});
	} else {
		// If user visits the site for
		// first time
		req.session.view = 1;
		res.status(200).send({
			msg: 'You have visited this page' + ' for first time ! Welcome....',
			code: 200,
		});
	}
});

router.get('/login', (req, res) => {
	// var x = getSessionIDCookie(req, res);
	// console.log(x, '34');
	if (req.session.user) {
		res.status(200).send({
			msg: 'User already logged in',
			user: req.session.user,
			isFirst: req.session.user.isFirst,
			islogged: true,
			code: 200,
		});
	} else {
		console.log('User not logged in');
		global.sessionUser = null;
		res.status(203).send({
			msg: 'User not logged in',
			islogged: false,
			code: 102,
		});
	}
<<<<<<< HEAD
=======
	if (req.session.views) {
		req.session.views++;
	} else {
		req.session.views = 1;
	}
	res.send(`You have visited this page ${req.session.views} times.`);
	// res.status(200).send({
	// 	msg: `Hey u ${JSON(req.session)}`,

	// 	code: 200,
	// });
});

router.get('/login', (req, res) => {
	res.status(200).send({
		msg: 'User already logged in',
		islogged: true,
		code: 200,
	});

>>>>>>> afeb0ea866dd41a64be29ad6f8b0a2dea5612ab8
=======
>>>>>>> 45faf729b84da0dc884d0faa91ab1f0735063c35
>>>>>>> master
});

/* This is exporting the router object. */
module.exports = router;
