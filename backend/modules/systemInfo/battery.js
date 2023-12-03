const si = require('systeminformation');
si.battery().then((data) => console.log(data));
