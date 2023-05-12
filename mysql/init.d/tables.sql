USE GY_DB;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id INT,
    user_name varchar(20),
    pass varchar(20),
    email varchar(30),
    icon varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS hashtags;
CREATE TABLE hashtags(
    id INT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY hashtags(id)
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts(
    id INT,
    user INT,
    content varchar(255) NOT NULL,
    msg varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY posts(id, user),
    FOREIGN KEY posts(user) REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS points;
CREATE TABLE points(
    id INT,
    point_num INT,
    PRIMARY KEY points(id),
    FOREIGN KEY points(id) REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS posts_hashtags;
CREATE TABLE posts_hashtags(
    post INT,
    hashtag INT,
    PRIMARY KEY posts_hashtags(post, hashtag),
    FOREIGN KEY posts_hashtags(post) REFERENCES points(id) ON DELETE CASCADE,
    FOREIGN KEY posht_hashtags(hashtag) REFERENCES hashtags(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS likes;
CREATE TABLE likes(
    user INT,
    like_num INT,
    PRIMARY KEY likes(user),
    FOREIGN KEY likes(user) REFERENCES users(id) ON DELETE CASCADE
);

