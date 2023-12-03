const db = require('./index');

const checkDBTable = (table) => {
	if (table == null || table.length === 0) return null;
	db.query('SELECT * FROM ' + table, null, function(err, result) {
		if (err) throw err.sqlMessage;
		return result;
	});
};
const createUserTable = () => {
	var sql =
		'CREATE TABLE users ( userID int unsigned not null auto_increment primary key, name varchar(255) DEFAULT NULL, `lastname` varchar(255) DEFAULT NULL, `username` varchar(255) DEFAULT NULL,`email` varchar(255) DEFAULT NULL,`password` varchar(255) DEFAULT NULL,`role` varchar(255) DEFAULT NULL,`ischecked` bit(1),`isLogged` bit(1),`createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,`LastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=latin1;';
	db.query(sql, function(err, result) {
		if (err) throw err;
		console.log('Table created');
	});
};
module.exports = { checkDBTable, createUserTable };
