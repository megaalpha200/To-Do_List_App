var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database-name'
});

//TABLE STRUCTURE
//The table name is 'todos'
//It has two fields: 'ITEM_ID' & 'ITEM_DESC'
//'ITEM_ID' is a primary key with auto increment of type INT
//'ITEM_DESC' is of type VARCHAR

module.exports = {
  retrieveData: function(callback) {
    pool.getConnection(function(err, connection) {
      connection.connect();
      connection.query('SELECT * FROM todos;', function(error, results, fields) {
        connection.release();
        callback(results);
      });
    });
  },
  sendData: function(data, callback) {
    pool.getConnection(function(err, connection) {
      connection.connect();
      connection.query(`INSERT INTO todos (ITEM_DESC) VALUES('${data}');`, function(error, results, fields) {
        connection.release();
        callback();
      });
    });
  },
  deleteData: function(id, callback) {
    pool.getConnection(function(err, connection) {
      connection.connect();
      connection.query(`DELETE FROM todos WHERE ITEM_ID='${id}'`, function(error, results, fields) {
        connection.release();
        callback();
      });
    });
  }
};
