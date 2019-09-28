-- Only users with role admin can create posts.
CREATE TRIGGER insertvalidateRole BEFORE INSERT ON posts 
FOR EACH ROW BEGIN
   IF (SELECT role FROM users WHERE id = NEW.user) != 'admin' THEN 
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Not authorized to create post';
   END IF;
END$$
CREATE TRIGGER updatevalidateRole BEFORE UPDATE ON posts 
FOR EACH ROW BEGIN
   IF (SELECT role FROM users WHERE id = NEW.user) != 'admin' THEN 
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Not authorized to create post';
   END IF;
END$$