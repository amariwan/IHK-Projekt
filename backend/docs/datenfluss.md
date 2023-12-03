# DatenFluss

```js
{
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
```
Der Code definiert ein Datenmodell definiert einen Sensor mit verschiedenen
Eigenschaften wie Name, Typ, Datentyp, Einheit, Minimum- und Maximumwert,
Status, Zeitstempel und weiteren Optionen.
Es gibt zwei Arten von Sensoren: echte Sensoren und virtuelle Sensoren. Echte
Sensoren senden kontinuierlich Daten an das Backend, während virtuelle Sen-
soren SQL-Abfragen an das Backend senden, um Daten aus der Datenbank
abzurufen.

1. Der Prozess der Sensorregistrierung beginnt damit, dass der Sensorbauer
eine API-Anfrage an das Backend sendet und seine Anmeldeinformatio-
nen übermittelt. Das Backend prüft, ob der Sensor bereits registriert ist.
Wenn nicht, wird der Sensor in der Datenbank registriert und die Anmeld-
einformationen werden an den Sensorbauer zurückgesendet.
2. Nach Erhalt der sensorid kann der Sensor regelmäßig Daten an das Ba-
ckend übermitteln und Konfigurationsdaten abrufen. Das Backend ruft die
Konfigurationsdaten des Sensors über die sensorid aus der Datenbank ab
und aktualisiert seine Eigenschaften, wie Name, Typ, Datentyp und Ein-
heit.
3. Der Sensor kann über die show-Eigenschaft angeben, ob er seine Daten
an das Frontend senden möchte, und über saveData, ob er seine Daten in
der Datenbank speichern möchte. Wenn der Sensor Daten senden möch-
te, aktualisiert er das Datenfeld im Sensor-Modell und sendet es an das
Backend.
4. Das Backend prüft, ob die Daten gemäß der in der Variablen DataReten-
tionPeriodInMonths festgelegten Aufbewahrungsfrist gespeichert werden
sollen. Wenn der saveData-Wert auf true gesetzt ist, speichert das Ba-
ckend die Daten in der Datenbank und aktualisiert den Sensor-Status und
den Zeitstempel.
5. Wenn der Sensor ein virtueller Sensor ist, kann er über die commendsql-Eigenschaft SQL-Abfragen an das Backend senden, um Daten aus der
Datenbank abzurufen. Das Backend führt die Abfrage aus und sendet das
Ergebnis an den virtuellen Sensor.
6. Das Frontend empfängt die Daten von den aktiven Sensoren und aktuali-
siert die Benutzeroberfläche entsprechend. Das Backend überwacht den
Status der Sensoren und informiert den Sensorbauer über Probleme, die
auftreten könnten, wie z.B. Sensorausfälle oder Datenbankfehler.
7. Der Sensorbauer kann über die API auch neue Sensoren registrieren, be-
stehende Sensoren aktualisieren oder löschen sowie weitere Konfigura-
tionen durchführen. Das Backend stellt hierfür entsprechende Funktionen
bereit.
