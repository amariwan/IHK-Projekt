const si = require('systeminformation');
si.users().then((data) => console.log(data));
