CREATE TABLE blogs(
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs(author, url, title, likes) VALUES ('Author Name 1', 'http://exampleblog1.com', 'First Blog Title', 7);
INSERT INTO blogs (author, url, title) VALUES ('Author Name 2', 'http://exampleblog2.com', 'Second Blog Title');
