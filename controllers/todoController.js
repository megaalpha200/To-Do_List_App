var bodyParser = require('body-parser');
var dbConnection = require('./dbConnectionController');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var refreshData = function(callback) {
  dbConnection.retrieveData(function(data) {
    callback({todos: data});
  });
};

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    refreshData(function(data) {
      res.render('todo', data);
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    dbConnection.sendData(req.body.ITEM_DESC, function() {
      refreshData(function(data) {
        res.json(data);
      });
    });
  });

  app.delete('/todo/:item', function(req, res) {
    dbConnection.deleteData(parseInt(req.params.item), function() {
      refreshData(function(data) {
        res.json(data);
      });
    });
  });
};
