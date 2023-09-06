+-----------------+      +----------------+        +-----------------+
|     Patient     |      | MedicationDose |        |   DailyRecord   |
+-----------------+      +----------------+        +-----------------+
| PatientID       |--+   | DoseID         |    +---| RecordID        |
| FirstName       |  |   | PatientID      |    |   | PatientID       |
| LastName        |  +---| ScheduledTime  |    |   | Date            |
| PhoneNumber    |      | TakenTime      |    |   | MedicationTaken |
| NextDoseDate   |      +----------------+    |   +-----------------+
| DoctorID      |                             |
+-----------------+      +----------------+    |
                        |    Doctor      |    |
                        +----------------+    |
                        | DoctorID       |    |
                        | FirstName      |    |
                        | LastName       |    |
                        | Email          |    |
                        | Position       |    |
                        | Hospital       |    |
                        +----------------+    |
                                               |
                                           +---v---+
                                           | Reminder|
                                           +--------+
                                           | ReminderID |
                                           | Type      |
                                           | Time      |
                                           +----------+
                                               |
                                           +---v---+
                                           |   UnpickedDose   |
                                           +-----------------+
                                           | UnpickedDoseID  |
                                           | PatientID       |
                                           | DoseDate        |
                                           +-----------------+
