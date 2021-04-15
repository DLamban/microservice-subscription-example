-- Create basic database with just a table to hold the subscription records
CREATE DATABASE IF NOT EXISTS demosubscriptiondb;
USE demosubscriptiondb;
CREATE TABLE IF NOT EXISTS subscriptions (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  email VARCHAR(50) NOT NULL UNIQUE, 
  name VARCHAR(20), 
  gender VARCHAR(20),   
  agreement BOOLEAN NOT NULL, 
  newsletterId INT NOT NULL, 
  birth DATE NOT NULL);
