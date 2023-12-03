'use strict';

const si = require('systeminformation');
si.diskLayout().then((data) => console.log(data));
