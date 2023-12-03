const express = require('express');
const router = express.Router(); // Creating a router object.
const config_data = require('../../backend/.config/config.json');
// Add some values to the port as the port number for http and ws

/* Telling the server to saerve the static files in the webUI folder. */
router.get('/', (req, res) => {
  res.status(200).send({
    msg: 'Hey u',
    code: 200,
  });
});


//! It's Klaus-Dieter idee
/*
CREATE TABLE IF NOT EXISTS `sensors` (
   sensor_id INT AUTO_INCREMENT PRIMARY KEY
  , sensor_name VARCHAR(255) NOT NULL
  , sensor_type VARCHAR(255) NOT NULL
  , data_type VARCHAR(255) NOT NULL
  , unit VARCHAR(255) NOT NULL
  , unit_display VARCHAR(255) NOT NULL
  , refresh_interval INT NULL
  , data_source TEXT NULL
  , data_parser TEXT NULL
  , sensore_max INT NOT NULL
  , sensore_min INT NOT NULL
  , show BOOLEAN NOT NULL
  , data TEXT NULL
  , sensor_status VARCHAR(255) NOT NULL
  , timestamp INT NOT NULL
  , expectedLast DATETIME NOT NULL
  , updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  , created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/


	const EnergieTaenzer = {
		"sensor_id": "2",
		"sensor_name": "Energie-Tänzer",
		"sensor_type": "physical",
		"data_type": "string",
		"unit": "Tanzbewegungen",
		"unit_display": "Tanzbewegungen",
		"sensor_max": 100,
		"sensor_min": 0,
		"show": true,
		"saveData": true,
    "DataRetentionPeriodInMonths": 6,
		"data": [],
		"sensor_status": 'green',
		"LastUpdated": new Date(),
		"timestamp": Date.now(),
		"expectedLast": 'Date',
    "commendsql": "SELECT COUNT(*) FROM dance_moves WHERE energy > 10;",
  }



const KD_integer = {
  "sensor_id": "1",
  "sensor_name": "Anrufe pro Stunde",
  "sensor_type": "process",
  "data_type": "integer",
  "unit": "anrufe",
  "unit_display": "Anrufe/h",
  "sensor_max": 1000,
  "sensor_min": 0,
  "show": true,
  "saveData": true,
  "DataRetentionPeriodInMonths": 6,
  "data": [],
  "sensor_status": 'red',
  "LastUpdated": new Date(),
  "timestamp": Date.now(),
  "expectedLast": 'Date',
  "commendsql":"select * from sensor;"
}

const KD_string = {
  "sensor_id": "2",
  "sensor_name": "Anrufe pro Stunde",
  "sensor_type": "process",
  "data_type": "string",
  "unit": "anrufe",
  "unit_display": "Anrufe/h",
  "sensor_max": 1000,
  "sensor_min": 0,
  "show": true,
  "data": [],
  "sensor_status": 'red',
  "LastUpdated": new Date(),
  "timestamp": Date.now(),
  "expectedLast": 'Date'
}





//-------------------------------------------------------

// example for integer
const integer = {
  "sensor_id": "1",
  "sensor_name": "Anrufe pro Stunde",
  "sensor_type": "process",
  "data_type": "integer",
  "unit": "anrufe",
  "unit_display": "Anrufe/h",
  "sensor_max": 1000,
  "sensor_min": 0,
  "show": true,
  "saveData": true,
  "DataRetentionPeriodInMonths": 6,
  "data": [],
  "sensor_status": 'red',
  "LastUpdated": new Date(),
  "timestamp": Date.now(),
  "expectedLast": 'Date',
  "commendsql":"select * from sensor;",
  "sensor_normal_status": [{
    "mod": ">=",
    "maxValue": "sensor_id_11_maxValue",
    "minValue": 0
  }, {
    "mod": "<=",
    "maxValue": 50,
    "minValue": 100
  }],
  "sensor_warning_status": [{
    "mod": ">=",
    "maxValue": 70,
    "minValue": 50
  }, {
    "mod": "<=",
    "maxValue": 30,
    "minValue": 50
  }],
  "sensor_error_status": [{
    "mod": ">=",
    "maxValue": 90,
    "minValue": 70
  }, {
    "mod": "<=",
    "maxValue": 20,
    "minValue": 30
  }, {
    "mod": "<=",
    "maxValue": 10,
    "minValue": 30
  }]
}

const string = {
  "sensor_id": "2",
  "sensor_name": "Anrufe pro Stunde",
  "sensor_type": "process",
  "data_type": "string",
  "unit": "anrufe",
  "unit_display": "Anrufe/h",
  "refresh_interval": 30000, // in milliseconds
  "command": "ps aux | grep dialer | awk '{print $4/1024}'",
  "data_source": "http://example.com/api/Anrufe_pro_Stunde",
  "data_parser": "function(data) { return data.value; }",
  "reult_data": "function(data) { return data.value; }",
  "sensor_max": 1000,
  "sensor_min": 0,
  "sensor_normal_status": [{
    "mod": "===",
    "value": "OK"
  }],
  "sensor_warning_status": [{
    "mod": "===",
    "value": "WARNING"
  }],
  "sensor_error_status": [{
    "mod": "===",
    "value": "ERROR"
  }]
}

const boolean = {
  "sensor_id": "3",
  "sensor_name": "Anrufe pro Stunde",
  "sensor_type": "process",
  "data_type": "boolean",
  "unit": "anrufe",
  "unit_display": "Anrufe/h",
  "refresh_interval": 30000, // in milliseconds
  "command": "ps aux | grep dialer | awk '{print $4/1024}'",
  "data_source": "http://example.com/api/Anrufe_pro_Stunde",
  "data_parser": "function(data) { return data.value; }",
  "reult_data": "function(data) { return data.value; }",
  "sensor_max": 1000,
  "sensor_min": 0,
  "sensor_normal_status": [{
    "mod": "===",
    "value": true
  }],
  "sensor_warning_status": [{
    "mod": "===",
    "value": false
  }],
  "sensor_error_status": [{
    "mod": "===",
    "value": false
  }]
}

const float = {
  "sensor_id": "4",
  "sensor_name": "Anrufe pro Stunde",
  "sensor_type": "process",
  "data_type": "float",
  "unit": "anrufe",
  "unit_display": "Anrufe/h",
  "refresh_interval": 30000, // in milliseconds
  "command": "ps aux | grep dialer | awk '{print $4/1024}'",
  "data_source": "http://example.com/api/Anrufe_pro_Stunde",
  "data_parser": "function(data) { return data.value; }",
  "reult_data": "function(data) { return data.value; }",
  "sensor_max": 1000,
  "sensor_min": 0,
  "sensor_normal_status": [{
    "mod": ">=",
    "maxValue": 50,
    "minValue": 0
  }, {
    "mod": "<=",
    "maxValue": 50,
    "minValue": 100
  }],
  "sensor_warning_status": [{
    "mod": ">=",
    "maxValue": 70,
    "minValue": 50
  }, {
    "mod": "<=",
    "maxValue": 30,
    "minValue": 50
  }],
  "sensor_error_status": [{
    "mod": ">=",
    "maxValue": 90,
    "minValue": 70
  }, {
    "mod": "<=",
    "maxValue": 20,
    "minValue": 30
  }, {
    "mod": "<=",
    "maxValue": 10,
    "minValue": 30
  }]
}

const array = {
  "sensor_id": "5",
  "sensor_name": "Anrufe pro Stunde",
  "sensor_type": "process",
  "data_type": "array",
  "unit": "anrufe",
  "unit_display": "Anrufe/h",
  "refresh_interval": 30000, // in milliseconds
  "command": "ps aux | grep dialer | awk '{print $4/1024}'",
  "data_source": "http://example.com/api/Anrufe_pro_Stunde",
  "data_parser": "function(data) { return data.value; }",

}



/* This is exporting the router object. */
module.exports = router;
