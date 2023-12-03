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


es gebt zwar arten von sensoren
* echte sensoren
* virtuelle sensoren


1. Sensoren melden sich beim backend an
2. die sensoren können mit der variab `Show` in der Json dem backend sagen ob die informationen dreicht zum Frontend geschickt werden sollen, mit saveData sagt der Sensor ob die Informationen im Datenbank gespeichen werde sollen.
3. die Virtuelle sensoren haben die Fähigkeit SQL abfragen zum Backend zu senden, die Sql Abfragen werden dann zum Datenbank gesendet, dann wird die Ergebnisse wieder zum virtuellen Sensor gesendet.
4. Die sensoren können mit der variab `DataRetentionPeriodInMonths` wie lange die daten gespeichet werden darf


Der Prozess der Sensorregistrierung beginnt damit, dass der Sensorbauer eine API-Anfrage an das Backend sendet und seine Anmeldeinformationen übermittelt. Das Backend registriert den neuen Sensor in seiner Datenbank und weist ihm eine eindeutige sensor_id zu.

Nach Erhalt der sensor_id kann der Sensor regelmäßig Daten an das Backend übermitteln und Konfigurationsdaten abrufen. Das Backend ruft die Konfigurationsdaten des Sensors über die sensor_id aus der Datenbank ab und aktualisiert seine Eigenschaften, wie Name, Typ, Datentyp und Einheit.

Der Sensor kann über die show-Eigenschaft angeben, ob er seine Daten an das Frontend senden möchte, und über saveData, ob er seine Daten in der Datenbank speichern möchte. Wenn der Sensor Daten senden möchte, aktualisiert er das Datenfeld im Sensor-Modell und sendet es an das Backend.

Das Backend prüft, ob die Daten gemäß der in der Variablen DataRetentionPeriodInMonths festgelegten Aufbewahrungsfrist gespeichert werden sollen. Wenn der saveData-Wert auf true gesetzt ist, speichert das Backend die Daten in der Datenbank und aktualisiert den Sensor-Status und den Zeitstempel.

Wenn der Sensor ein virtueller Sensor ist, kann er über die commendsql-Eigenschaft SQL-Abfragen an das Backend senden, um Daten aus der Datenbank abzurufen. Das Backend führt die Abfrage aus und sendet das Ergebnis an den virtuellen Sensor.

Das Frontend empfängt die Daten von den aktiven Sensoren und aktualisiert die Benutzeroberfläche entsprechend. Das Backend überwacht den Status der Sensoren und informiert den Sensorbauer über Probleme, die auftreten könnten, wie z.B. Sensorausfälle oder Datenbankfehler.

Der Sensorbauer kann über die API auch neue Sensoren registrieren, bestehende Sensoren aktualisieren oder löschen sowie weitere Konfigurationen durchführen. Das Backend stellt hierfür entsprechende Funktionen bereit.


Aufgabenstellung
Ein System aus mindst. 10 Komponenten unterschiedlicher Art soll beobachtet werden.
Es soll mit einem Blick möglich sein, den aktuellen Zustand des System zu bewerten.
Neben einer einfach zu lesenden Anzeige des Ist-Zustands soll eine zweite Anzeige
(Bewertungsanzeige) auf kommende Probleme hinweisen.
Beispiel:
Ein Sensor 1 beobachtet die letzte Status-Änderung bei Produktseinheiten.
Ein weiterer Sensor 2 erfasst den letzten Fertigstellungszeitpunkt eines Produkts. In der Ist-Darstellung wird für den Sensor 1 eine rote Ampel angezeigt, wenn innerhalb der letzten n-Minuten kein Statuswechsel erfolgt ist,
eine gelbe Ampel wenn in der Zeit weniger als durchscnittlich viele Statuswechsel erkannt wurde.
Grün wird angezeit, wenn viele Statuswechsel erkannt werden können.
Analog dazu wird auch für den zweiten Sensor eine Ampel angezeigt: rot bei keiner Fertigstellung in den letzten m-Minuten
und grün wenn hinreichend viele Produkte fertig gestellt wurden. Wenn in der Ist-Darstellung beide Sensoren rot dargestellt werden bedeutet das aber nicht, dass das System in irgend einer Weise gefährdet ist.
Es bedeutet nur, das niemand produziert und deswegen auch nichts fertig wird.
Im Falle, das Sensor 1 grün und Sensor 2 rot ist, deutet das hingegen auf ein System-Problem hin. Die zweite Anzeige soll den Zustand des System so abbilden, das Probleme erkannt und im besten Fall vor eintreten einer  Störung gewarnt wird.
In diesem Beispiel würden die beiden Sensoren zu einer Anzeige zusammengefasst: Sesnsor1    Sensor2    Zustandsbewertung
rot            rot        OK
gelb        rot        eine Störung, oder bald eine Störung
gruen        rot        Störung
rot            grün    OK
gelb        grün    OK
grün        grün    OK Ich wünsche mir also einen Monitor, mit dem man auf einen Blick sowohl Ist-Zustand des System ersehen kann
und zugleich eine Darstellung wir dieser Systemzustand zu bewerten ist. Ich möchte keine Verläufe darstellen, also keine Grafen (Kurven etc.), sondern nur diskrete Zustandsbeschreibungen.
Die Sensoren sollten Datenbank-Einträge abfragen. Ggf. sollten Hilfsprozesse Sensor-Daten in eine Datenbank eintragen,
für die man dann einen entsprechenden Sensor bauen kann.
Die zeitliche Auflösung der Sensoren müss den erfassten Daten entsprechend angepasst werden können. Als Darstellung muss nicht immer eine Ampel gewählt werden, auch analoge Darstellungen wie beispielsweise die Größe sind denkbar.
Wichtig ist nur: die Anzeige muss mit einem kurzen Blick zu erfassen sein.
