const si = require('systeminformation');
si.versions('npm, php, node, pm2, mysql').then((data) => console.log(data));
