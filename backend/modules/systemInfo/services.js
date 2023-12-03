const si = require('systeminformation');
si.services().then((data) => console.log(data));
