CREATE TABLE LogEntries(
	entryTimestamp TIMESTAMP NOT NULL PRIMARY KEY,
    levelNum INT NOT NULL,
    sortAlgorithm VARCHAR(20) NOT NULL,
    levelCompleted BOOL DEFAULT 0,
    mistakesMade INT DEFAULT 0,
    levelTime TIME NOT NULL
);