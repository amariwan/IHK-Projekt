const express = require('express');
const router = express.Router(); // Creating a router object.
const config_data = require('../../backend/.config/config.json');
// Add some values to the port as the port number for http and ws

/* Telling the server to saerve the static files in the webUI folder. */
router.post('/', (req, res) => {
	console.log(req.body);
	res.status(200).send({
		msg: 'Hey u',
		data: "sus",
		code: 200,
	});
});

/* This is exporting the router object. */
module.exports = router;
