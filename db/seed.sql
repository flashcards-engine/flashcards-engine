PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;
CREATE TABLE flashcard_set_group (
    flashcard_set_group_id TEXT PRIMARY KEY,
    flashcard_set_group_parent_id TEXT,
    flashcard_set_group_name TEXT NOT NULL,
    flashcard_set_group_created_time INTEGER DEFAULT (strftime('%s', 'now')),
    flashcard_set_group_updated_time INTEGER DEFAULT (strftime('%s', 'now'))
);
CREATE TABLE flashcard_set (
    flashcard_set_id TEXT PRIMARY KEY,
    flashcard_set_group_id TEXT NOT NULL,
    flashcard_set_name TEXT NOT NULL,
    flashcard_set_created_time INTEGER DEFAULT (strftime('%s', 'now')),
    flashcard_set_updated_time INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (flashcard_set_group_id)
        REFERENCES flashcard_set_group (flashcard_set_group_id)
        ON DELETE RESTRICT
);
CREATE TABLE flashcard (
    flashcard_id TEXT PRIMARY KEY,
    flashcard_prompt TEXT NOT NULL,
    flashcard_answer TEXT NOT NULL,
    flashcard_created_time INTEGER DEFAULT (strftime('%s', 'now')),
    flashcard_updated_time INTEGER DEFAULT (strftime('%s', 'now'))
);
CREATE TABLE flashcard_set_flashcard (
    flashcard_set_flashcard_id TEXT PRIMARY KEY,
    flashcard_set_id TEXT NOT NULL,
    flashcard_id TEXT NOT NULL,
    FOREIGN KEY (flashcard_set_id)
        REFERENCES flashcard_set (flashcard_set_id)
        ON DELETE CASCADE,
    FOREIGN KEY (flashcard_id)
        REFERENCES flashcard (flashcard_id)
        ON DELETE CASCADE
);
COMMIT;

CREATE TRIGGER [update_flashcard_set_group_timestamp]
AFTER UPDATE ON flashcard_set_group
FOR EACH ROW
BEGIN
    UPDATE flashcard_set_group SET flashcard_set_group_updated_time = strftime('%s', 'now') WHERE flashcard_set_group_id = old.flashcard_set_group_id;
END;

CREATE TRIGGER [update_flashcard_set_timestamp]
AFTER UPDATE ON flashcard_set
FOR EACH ROW
BEGIN
    UPDATE flashcard_set SET flashcard_set_updated_time = strftime('%s', 'now') WHERE flashcard_set_id = old.flashcard_set_id;
END;

CREATE TRIGGER [update_flashcard_timestamp]
AFTER UPDATE ON flashcard
FOR EACH ROW
BEGIN
    UPDATE flashcard SET flashcard_updated_time = strftime('%s', 'now') WHERE flashcard_id = old.flashcard_id;
END;