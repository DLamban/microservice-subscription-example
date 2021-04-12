CREATE DATABASE IF NOT EXISTS demosubscriptiondb;
USE demosubscriptiondb;
CREATE TABLE IF NOT EXISTS subscriptions (
  email VARCHAR(50) NOT NULL, 
  name VARCHAR(20), 
  gender VARCHAR(20),   
  agreement BOOLEAN NOT NULL, 
  newsletterId INT NOT NULL, 
  birth DATE NOT NULL);


