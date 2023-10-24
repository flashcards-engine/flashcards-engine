CREATE TABLE flashcard_set_group (
    flashcard_set_group_id TEXT PRIMARY KEY,
    flashcard_set_group_parent_id TEXT NOT NULL,
    flashcard_set_group_name TEXT NOT NULL
);

CREATE TABLE flashcard_set (
    flashcard_set_id TEXT PRIMARY KEY,
    flashcard_set_group_id TEXT NOT NULL,
    flashcard_set_name TEXT NOT NULL,
    FOREIGN KEY (flashcard_set_group_id)
        REFERENCES flashcard_set_group (flashcard_set_group_id)
        ON DELETE RESTRICT
);

CREATE TABLE flashcard (
    flashcard_id TEXT PRIMARY KEY,
    flashcard_prompt TEXT NOT NULL,
    flashcard_answer TEXT NOT NULL
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

