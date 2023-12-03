const si = require('systeminformation');
si.chassis().then((data) => console.log(data));
