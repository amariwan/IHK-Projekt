// Converts a time date to a string
// time: time in milliseconds since epoch
// style: 1 = month/day hour:minute:second
//        2 = month-day hour:minute:second.milliseconds
const timeString = (time, style = 1) => {
	// convert date to string
	const date = new Date(time);
	const month = (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
	const day = date.getDate().toString().length > 1 ? date.getDate() : `0${date.getDate()}`;
	const hour = date.getHours().toString().length > 1 ? date.getHours() : `0${date.getHours()}`;
	const minute = date.getMinutes().toString().length > 1 ? date.getMinutes() : `0${date.getMinutes()}`;
	const second = date.getSeconds().toString().length > 1 ? date.getSeconds() : `0${date.getSeconds()}`;
	let milliseconds = date.getMilliseconds().toString();
	if (milliseconds.length === 2) {
		milliseconds = `0${milliseconds}`;
	} else if (milliseconds.length === 1) {
		milliseconds = `00${milliseconds}`;
	}

	if (style === 1) {
		return `${month}/${day} ${hour}:${minute}:${second}`;
	}

	if (style === 2) {
		return `${month}-${day} ${hour}:${minute}:${second}.${milliseconds}`;
	}
};

module.exports = timeString;
