module.exports =  (app)=> {
const indexRouter = require('./index');
app.use('/', indexRouter);
//-------------------------------------------------------
const authRouter = require('./auth');
app.use('/auth', authRouter);
//-------------------------------------------------------
const registerSensore = require('./registerSensore');
app.use('/registerSensore', registerSensore);
//-------------------------------------------------------
const getSensoreData = require('./getSensorData');
app.use('/getDataSensore', getSensoreData);
};
