const getSessionIDCookie = (req, res) => {
	const { headers: { cookie } } = req;
	if (cookie) {
		const item = cookie.split(';').reduce((res, item) => {
			const data = item.trim().split('=');
			return {
				...res,
				[data[0]]: data[1]
			};
		}, {});

		const values = Object.values(item);
		res.locals.cookie = item;
		req.session.cookie = values;
		return values;
	} else return false;
};

const clearAllcookie = (req, res) => {
	if (req == null || req.cookies == null || req.cookies.length == 0) return false;
	cookie = req.cookies;
	for (var prop in cookie) {
		if (!cookie.hasOwnProperty(prop)) {
			continue;
		}
		res.cookie(prop, '', { expires: new Date(0) });
	}
	return true;
};
// clean up sessions that go stale over time
function session_cleanup() {
	sessionStore.all(function(err, sessions) {
		for (var i = 0; i < sessions.length; i++) {
			sessionStore.get(sessions[i], function() {});
		}
	});
}

module.exports = { clearAllcookie, getSessionIDCookie };
