use blog_app;
DROP TABLE comments;
DROP TABLE posts;
DROP TABLE users;

CREATE TABLE users (
   id SERIAL,
   username VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   role ENUM('admin', 'guest') DEFAULT "guest" NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE posts (
   id SERIAL,
   title VARCHAR(255),
   contents TEXT  ,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
   user BIGINT unsigned NOT NULL,

   FOREIGN KEY(user) REFERENCES users(id) 
      ON DELETE CASCADE
);

CREATE TABLE comments (
   id SERIAL,
   name VARCHAR(255),
   contents TEXT NOT NULL,
   user BIGINT unsigned,
   post BIGINT unsigned NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

   FOREIGN KEY(user) REFERENCES users(id) 
      ON DELETE CASCADE,
   FOREIGN KEY(post) REFERENCES posts(id) 
      ON DELETE CASCADE
);

DELIMITER $$

-- You have to provide name or be logged in to insert comment.
CREATE TRIGGER insertCommentNameNotNull BEFORE INSERT ON comments
FOR EACH ROW 
BEGIN
   IF(NEW.name IS NULL AND NEW.user IS NULL) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = "Name or user must be provided";
   END IF;
END$$

-- You have to provide name or be logged in to update comment.
CREATE TRIGGER updateCommentNameNotNull BEFORE UPDATE ON comments
FOR EACH ROW 
BEGIN
   IF(NEW.name IS NULL AND NEW.user IS NULL) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = "Name or user must be provided";
   END IF;
END$$

DELIMITER ;

-- INSERT INTO users(
--    username,
--    password,
--    role
-- ) VALUES('admin', '123454', 'admin');

-- INSERT INTO users(
--    username,
--    password
-- ) VALUES('test', '123454');

-- INSERT INTO posts (
--    title,
--    contents,
--    user
-- ) VALUES('Heya!', 'I am new here!', 1);

-- INSERT INTO posts (
--    title,
--    contents,
--    user
-- ) VALUES('Heya!', 'I am new here!', 2);