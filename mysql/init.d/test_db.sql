USE GY_DB;
DROP TABLE IF EXISTS test;
CREATE TABLE test(id int, name varchar(10));
INSERT INTO test(id,name) VALUES(1,"TESTDAO");
INSERT INTO test(id,name) VALUES(2,"日本語行ける？");
