PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;
CREATE TABLE flashcard_set_group (
    flashcard_set_group_id TEXT PRIMARY KEY,
    flashcard_set_group_parent_id TEXT,
    flashcard_set_group_name TEXT NOT NULL,
    flashcard_set_group_created_time INTEGER DEFAULT (strftime('%s', 'now')),
    flashcard_set_group_updated_time INTEGER DEFAULT (strftime('%s', 'now'))
);
INSERT INTO flashcard_set_group (flashcard_set_group_id, flashcard_set_group_parent_id, flashcard_set_group_name) VALUES('339c81fb-2418-4f9d-b575-206de15d2a5c',NULL,'Flashcards');
INSERT INTO flashcard_set_group (flashcard_set_group_id, flashcard_set_group_parent_id, flashcard_set_group_name) VALUES('75e734c4-76a7-11ee-8c3b-00a554dd65cb','339c81fb-2418-4f9d-b575-206de15d2a5c','Child 1');
INSERT INTO flashcard_set_group (flashcard_set_group_id, flashcard_set_group_parent_id, flashcard_set_group_name) VALUES('dabce70a-76ab-11ee-8d90-00a554dd65cb','339c81fb-2418-4f9d-b575-206de15d2a5c','Child 2');
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
INSERT INTO flashcard_set (flashcard_set_id, flashcard_set_group_id, flashcard_set_name) VALUES('3252450a-76a7-11ee-8eb1-00a554dd65cb','339c81fb-2418-4f9d-b575-206de15d2a5c','Set 1');
INSERT INTO flashcard_set (flashcard_set_id, flashcard_set_group_id, flashcard_set_name) VALUES('806d6e18-76ac-11ee-a231-00a554dd65cb','339c81fb-2418-4f9d-b575-206de15d2a5c','Set 2');
CREATE TABLE flashcard (
    flashcard_id TEXT PRIMARY KEY,
    flashcard_prompt TEXT NOT NULL,
    flashcard_answer TEXT NOT NULL,
    flashcard_created_time INTEGER DEFAULT (strftime('%s', 'now')),
    flashcard_updated_time INTEGER DEFAULT (strftime('%s', 'now'))
);
INSERT INTO flashcard (flashcard_id, flashcard_prompt, flashcard_answer) VALUES('e3d3bbe0-76a9-11ee-9f20-00a554dd65cb','prompt','answer');
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
INSERT INTO flashcard_set_flashcard VALUES('13d21c56-76aa-11ee-993d-00a554dd65cb','3252450a-76a7-11ee-8eb1-00a554dd65cb','e3d3bbe0-76a9-11ee-9f20-00a554dd65cb');
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