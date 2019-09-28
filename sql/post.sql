DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS userrole;
CREATE TYPE userrole as ENUM ('admin', 'guest');

CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   role userrole NOT NULL DEFAULT 'guest',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE posts (
   id SERIAL PRIMARY KEY,
   title VARCHAR(255),
   content TEXT  ,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   author INT NOT NULL,
   updated_at TIMESTAMP DEFAULT NULL,

   FOREIGN KEY(author) REFERENCES users(id) 
      ON DELETE CASCADE
);

CREATE TABLE comments (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255),
   content TEXT NOT NULL,
   author INT,
   post INT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT NULL,
   FOREIGN KEY(author) REFERENCES users(id) 
      ON DELETE CASCADE,
   FOREIGN KEY(post) REFERENCES posts(id) 
      ON DELETE CASCADE,

   CONSTRAINT check_name check (name IS NOT NULL OR author IS NOT NULL)
);

-- If your role is not admin you cannot create a new post.
CREATE OR REPLACE FUNCTION createPostAuth()
   RETURNS TRIGGER AS
$BODY$
BEGIN
   IF (SELECT role FROM users WHERE id = NEW.author) != 'admin' THEN
      RAISE SQLSTATE '45000'
         USING HINT = 'Only admins can create posts';
   END IF;
   RETURN NEW;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER post_auth
BEFORE INSERT ON posts
FOR EACH ROW
EXECUTE PROCEDURE createPostAuth();

-- Updating the updated_at TIMESTAMP when records updated
-- START
CREATE OR REPLACE FUNCTION updateTimestamp()
   RETURNS TRIGGER AS
$BODY$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE PROCEDURE updateTimestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE updateTimestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE PROCEDURE updateTimestamp();

-- END