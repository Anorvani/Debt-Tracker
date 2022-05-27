DROP DATABASE IF EXISTS debtCalculator;

CREATE DATABASE debtCalculator;

USE debtCalculator;

CREATE TABLE debts (
  id int NOT NULL AUTO_INCREMENT,
  creditor varchar(50),
  firstName varchar(50),
  lastName varchar(50),
  minPaymentPercentage decimal(10, 2) NOT NULL,
  balance decimal(20, 2) NOT NULL,
  PRIMARY KEY (ID)
);



/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u <USER> -p < schema.sql
 *  For example, on a pairing station, it'll be
 *    mysql -u student -p < schema.sql
 *  and then you'll have to enter the password, student
 *  On your personal computer, if you haven't set up
 *  a password, it'll be
 *    mysql -u root < schema.sql
*/

INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (1, "CBNA", "Suman", "Tester79", 2.00, 1363.00);
INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (2, "AMEX", "Suman", "Tester79", 2.00, 2763.00);
INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (3, "AMEX", "Suman", "Tester79", 2.00, 429.00 );
INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (4, "AMEX", "Suman", "Tester79", 2.00, 1363.00);
INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (5, "DISCOVERYBANK", "Suman", "Tester79", 2.00, 2644.00);
INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (6, "CAPITAL ONE", "Suman", "Tester79", 4.00, 5464.00);
INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (7, "CAPITAL ONE", "Suman", "Tester79", 4.00, 2345.00);
INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (8, "CAPITAL ONE", "Suman", "Tester79", 4.00, 836.00);
INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (9, "CBNA", "Suman", "Tester79", 3.50, 687.00);
INSERT INTO debts (id, creditor, firstName, lastName, minPaymentPercentage, balance) VALUES (10, "CBNA", "Suman", "Tester79", 3.50, 235.00);
