const mysql = require('mysql2');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllDebts = function(callback) {
  connection.query('SELECT * FROM debts', (err, data) => {
    if(err) {
      callback(err);
    } else {
      callback(null, data)
    }
  })
};


const postDebt = function(newDebt, callback) {
  let queryStr = 'INSERT INTO debts (creditorName, firstName, lastName, minPaymentPercentage, balance) VALUES (?, ?, ?, ?, ?)'
  let queryArgs = [newDebt.creditorName, newDebt.firstName, newDebt.lastName, newDebt.minPaymentPercentage, newDebt.balance]
  connection.query(queryStr, queryArgs, (err, data) => {
    if(err) {
      callback(err);
    } else {
      callback(null, data)
    }
  })
};

const unpostDebt = function(callback) {
  let queryStr = 'DELETE FROM debts ORDER BY id DESC limit 1'

  connection.query(queryStr, (err, data) => {
    if(err) {
      callback(err);
    } else {
      callback(null, data)
    }
  })
};

module.exports = {
  getAllDebts,
  postDebt,
  unpostDebt
};
