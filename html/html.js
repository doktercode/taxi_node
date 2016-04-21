var mongoose = require('mongoose');
var taxis = mongoose.model('taxi');

module.exports = function(app){



  app.get('/',function(req,res){
    res.sendFile(__dirname + '/views/index.html');
  });

  app.get('/home',function(req,res){
    res.send("ss");
  });

  app.post("/loginAdmin", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    // TODO:check user is valid from database

    if(true){
      req.session.isConnected = true;
      res.send("success");
    }else res.send("error");
  });
  app.get("/isloggedin", function (req, res) {
    if(req.session.isConnected) res.send("true");
    else res.send("false");
  });

  app.get('/taxiAdd',function(req,res){
    res.sendFile(__dirname + '/views/taxiAdd.html');
  });

  app.post('/taxiAdd/item',function(req,res){
    var mark = req.body.mark;
    var newTaxi = new taxis({mark:mark});
    newTaxi.save(function(err){
      if(err){
        res.json({'res':false});
      }else{
        res.json({'res':true});
      }
    });
  });

  app.get('/taxiConsult',function(req,res){
    res.sendFile(__dirname + '/views/taxiConsult.html');
  });

  app.get('/taxiConsult/getList',function(req,res){
    taxis.find({},{_id:0,mark:1,model:1,serial:1},function(err,data){
  		if(data.length != null){
        res.json({taxis:data});
  		}else{
  			res.json({taxis:[]});
  		}
  	}).sort({mark:1});

  });
}
