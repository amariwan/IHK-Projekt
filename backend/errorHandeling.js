const errorHandlers = require('./handlers/errorHandlers');
const config = require('./.config/config.json');
module.exports =  (app)=> {
  console.log(config.app_status);
  if (config.app_status === 'prod') {
    app.use(errorHandlers.productionErrors);
  } else {
    app.use(errorHandlers.developmentErrors);
  }
};
