var country = require('controllers/country');

module.exports = function(app){

  app.get('/',function(req,res){
    res.sendFile(__dirname + '/views/index.html');
  });

  app.get('/taxiAdd',function(req,res){
    res.sendFile(__dirname + '/views/taxiAdd.html');
  });

  app.get('/taxiConsult',function(req,res){
    res.sendFile(__dirname + '/views/taxiConsult.html');
  });
}
