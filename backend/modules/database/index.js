// const mysql = require('mysql');
// const config_data = require('../../.config/config.json');
// // db is optional
// /* Getting the database information from the config.json file. */
// const config_db = config_data.databank[0];
// const db = mysql.createPool(config_db); // or mysql.createConnection(config_db);

// /* This is creating a connection to the database. */
// db.getConnection((err, connection) => {
// 	if (err) throw err;
// 	console.log('🗃  DB connected successful: ' + connection.threadId);
// 	connection.release();
// });

// module.exports = db;
