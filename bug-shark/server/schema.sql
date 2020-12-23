-- Bug Shark Relational Database Schema
-- Vishwa Perera

CREATE TABLE Users(
    user_id INTEGER PRIMARY KEY,
    email VARCHAR(256) UNIQUE NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    gender VARCHAR(12)
);

CREATE TABLE Project(
    project_id INTEGER PRIMARY KEY,
    project_name VARCHAR(50)
);

CREATE TABLE Bug(
    bug_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    severity VARCHAR(8) NOT NULL,
    error VARCHAR(500),
    bug_status SMALLINT NOT NULL,
    reported TIMESTAMP NOT NULL,
    reporter_id INTEGER NOT NULL,
    workaround VARCHAR(500),
    solution VARCHAR(500),
    reproduce VARCHAR(500),
    CONSTRAINT bug_pk
        PRIMARY KEY (bug_id, project_id),
    CONSTRAINT bug_fk_reporter_id
        FOREIGN KEY (reporter_id) REFERENCES Users (user_id),
    CONSTRAINT bug_fk_project_id
        FOREIGN KEY (project_id) REFERENCES Project
);

CREATE TABLE Assigned(
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    bug_id INTEGER NOT NULL,
    CONSTRAINT assigned_pk
        PRIMARY KEY (user_id, project_id, bug_id),
    CONSTRAINT assigned_fk_user_id
        FOREIGN KEY (user_id) REFERENCES Users,
    CONSTRAINT assigned_fk_bug_id
        FOREIGN KEY (project_id, bug_id) REFERENCES Bug
);

CREATE TABLE Notified(
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    bug_id INTEGER NOT NULL,
    CONSTRAINT notified_pk
        PRIMARY KEY (user_id, project_id, bug_id),
    CONSTRAINT notified_fk_user_id
        FOREIGN KEY (user_id) REFERENCES Users,
    CONSTRAINT notified_fk_bug_id
        FOREIGN KEY (project_id, bug_id) REFERENCES Bug
);

CREATE TABLE Participant(
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    participant_type SMALLINT NOT NULL,
    CONSTRAINT participant_pk
        PRIMARY KEY (user_id, project_id),
    CONSTRAINT participant_fk_user_id
        FOREIGN KEY (user_id) REFERENCES Users,
    CONSTRAINT participant_fk_project_id
        FOREIGN KEY (project_id) REFERENCES Project
);

CREATE TABLE Invited(
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    invite_type SMALLINT NOT NULL,
    CONSTRAINT invited_pk
        PRIMARY KEY (user_id, project_id),
    CONSTRAINT invited_fk_user_id
        FOREIGN KEY (user_id) REFERENCES Users,
    CONSTRAINT invited_fk_project_id
        FOREIGN KEY (project_id) REFERENCES Project
);

CREATE TABLE Log(
    log_id INTEGER NOT NULL,
    bug_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    change VARCHAR(200) NOT NULL,
    logged TIMESTAMP NOT NULL,
    CONSTRAINT log_pk
        PRIMARY KEY (log_id, bug_id, project_id),
    CONSTRAINT log_fk_project_id
        FOREIGN KEY (bug_id, project_id) REFERENCES Bug
);