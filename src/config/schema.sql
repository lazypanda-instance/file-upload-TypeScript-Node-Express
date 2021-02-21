CREATE TABLE tutorial
(
    id SERIAL NOT NULL,
    name VARCHAR(255),
    role VARCHAR(255),
    website VARCHAR(255),
    CONSTRAINT tutorial_pkey PRIMARY KEY (id)
)

INSERT INTO tutorial(name, role, website) VALUES ('Lazy Panda', 'Developer', 'https://lazypandatech.com');
INSERT INTO tutorial(name, role, website) VALUES ('User1', 'QA', 'https://google.com');
INSERT INTO tutorial(name, role, website) VALUES ('User2', 'Management', 'https://yahoo.com');