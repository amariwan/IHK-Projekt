-- Tabelle zur Speicherung der Benutzerdaten
CREATE TABLE IF NOT EXISTS users (
  ID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  role varchar(255) NOT NULL,
  ischecked bit(1) NOT NULL,
  isLogged bit(1) NOT NULL,
  token TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
---------------------------------------------------------
-- Tabelle zur Speicherung der Sensorstatusinformationen
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS sensor_status (
  status_id INT AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  description VARCHAR(255) NULL,
  severity ENUM('Niedrig', 'Mittel', 'Hoch') NOT NULL,
  warning_threshold INT NOT NULL,
  critical_threshold INT NOT NULL,
  `mod` VARCHAR(2) NOT NULL,
  `maxValue` INT NOT NULL,
  minValue INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
---------------------------------------------------------
-- Tabelle zur Speicherung der Sensordaten
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS sensors (
  sensor_id INT AUTO_INCREMENT PRIMARY KEY,
  status_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (status_id) REFERENCES sensor_status(status_id),
  sensor_name VARCHAR(255) NOT NULL,
  sensor_type VARCHAR(255) NOT NULL,
  data_type ENUM('integer', 'float', 'string') NOT NULL,
  unit VARCHAR(255) NOT NULL,
  unit_display VARCHAR(255) NOT NULL,
  refresh_interval INT UNSIGNED NOT NULL DEFAULT 0,
  data_source TEXT NULL,
  data_parser TEXT NULL,
  sensor_max INT NOT NULL,
  sensor_min INT NOT NULL,
  visible BOOLEAN NOT NULL,
  data TEXT NULL,
  timestamp INT NOT NULL,
  expectedLast DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
---------------------------------------------------------
-- Tabelle zur Speicherung der Anwendungsdaten
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS Application (
  application_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  ipaddress varchar(255) NULL,
  sensor_ID INT UNSIGNED NOT NULL,
  command varchar(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
ALTER TABLE Application CONSTRAINT fk_application_sensors_id FOREIGN KEY (sensor_ID) REFERENCES `sensors`(sensor_id) ON UPDATE CASCADE ON DELETE CASCADE;
---------------------------------------------------------
-- Tabelle zur Speicherung der Serverdaten
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS server (
  ID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  ipaddress varchar(255) NULL,
  command varchar(255) NOT NULL,
  application_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_server_application_id FOREIGN KEY (application_id) REFERENCES `Application`(application_id) ON UPDATE CASCADE ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
---------------------------------------------------------
-- Tabelle zur Speicherung der Messdaten
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS measurement (
  measurement_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sensor_id INT UNSIGNED NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  timestamp INT NOT NULL,
  FOREIGN KEY (sensor_id) REFERENCES sensors(sensor_id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
CREATE TRIGGER measurement_insert
AFTER
INSERT ON sensors FOR EACH ROW
INSERT INTO measurement (sensor_id, value, timestamp)
VALUES (NEW.sensor_id, 0, UNIX_TIMESTAMP(NOW()));
---------------------------------------------------------
-- Tabelle zur Speicherung der Alert-Daten
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS alerts (
  alert_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  configuration_id INT UNSIGNED NOT NULL,
  sensor_id INT UNSIGNED NOT NULL,
  measurement_id INT UNSIGNED NOT NULL,
  message varchar(255) NULL,
  created_at timestamp NOT NULL CURRENT_TIMESTAMP,
  FOREIGN KEY (configuration_id) REFERENCES configuration(configuration_id),
  FOREIGN KEY (sensor_id) REFERENCES sensors(sensor_id),
  FOREIGN KEY (measurement_id) REFERENCES measurement(measurement_id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
---------------------------------------------------------
-- Tabelle zur Speicherung der Konfigurationsdaten
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS configuration (
  configuration_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
---------------------------------------------------------
-- Tabelle zur Speicherung der Benachrichtigungsschwellenwerte und Empfänger
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS notification_config (
  notification_config_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  configuration_id INT UNSIGNED NOT NULL,
  threshold DECIMAL(10, 2) NOT NULL,
  condition ENUM('greater', 'less') NOT NULL,
  email_recipient VARCHAR(255) NOT NULL,
  FOREIGN KEY (configuration_id) REFERENCES configuration(configuration_id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
---------------------------------------------------------
-- Tabelle zur Speicherung der Berichtsdaten
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS reports (
  report_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NULL,
  description varchar(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
---------------------------------------------------------
-- Tabelle zur Speicherung der Berichtselemente
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS report_items (
  report_item_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  report_id INT UNSIGNED NOT NULL,
  sensor_id INT UNSIGNED NOT NULL,
  measurement_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (report_id) REFERENCES reports(report_id),
  FOREIGN KEY (sensor_id) REFERENCES sensors(sensor_id),
  FOREIGN KEY (measurement_id) REFERENCES measurement(measurement_id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
---------------------------------------------------------
-- Tabelle zur Speicherung der Protokolldaten
---------------------------------------------------------
CREATE TABLE IF NOT EXISTS logs (
  log_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  level varchar(255) NOT NULL,
  message varchar(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARSET = latin1;
