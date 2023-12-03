const httpServer = require('../http/http');
const socketIo = require('socket.io');
module.exports = (app) => {
const dashboard = socketIo(httpServer, {
    path: '/dashboard'
});
    app.set('/dashboard', dashboard);
    require('./dashboard')(dashboard);
};
