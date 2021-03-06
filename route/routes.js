var method	= require('./methods');
var country = require('controllers/country');
var client	= require('controllers/client');
var driver	= require('controllers/driver');
var reclamation	= require('controllers/reclamation');
var service	= require('controllers/service');
var book	= require('controllers/book');
var taxi	= require('controllers/taxi');

module.exports = function(app){

	app.post('/getAllCountry',function(req,res){
		country.getAllCountry(function(found){
			res.json(found);
		});
	});

	app.post('/getAllCity',function(req,res){
		var name = req.body.name;
		country.getAllCity(name,function(found){
			res.json(found);
		});
	});

	app.post('/signup',function(req,res){
		var key = method.key(req.body.key);
		var app = method.decode(req.body.app,key);
		var fname = method.decode(req.body.fname,key);
		var lname = method.decode(req.body.lname,key);
		var gender = method.decode(req.body.gender,key);
		var dateN = method.decode(req.body.dateN,key);
		var country = method.decode(req.body.country,key);
		var city = method.decode(req.body.city,key);
		var email = method.decode(req.body.email,key);
		var password = method.decode(req.body.password,key);
		var phone = method.decode(req.body.phone,key);
		var picture = req.body.picture;
		if (app == "AppTaxi") {
			client.signup(fname,lname,gender,dateN,country,city,email,password,phone,picture,function(found){
				res.json(found);
			});
		} else if (app == "AppTaxiDriver") {
			driver.signup(fname,lname,gender,dateN,country,city,email,password,phone,picture,function(found){
				res.json(found);
			});
		}
	});

	app.post('/login',function(req,res){
		var key = method.key(req.body.key);
		var app = method.decode(req.body.app,key);
		var email = method.decode(req.body.email,key);
		var password = method.decode(req.body.password,key);
		if (app == "AppTaxi") {
			client.login(email,password,function(found){
				res.json(found);
			});
		} else if (app == "AppTaxiDriver") {
			driver.login(email,password,function(found){
				res.json(found);
			});
		}
	});

	app.post('/profile',function(req,res){
		var key = method.key(req.body.key);
		var app = method.decode(req.body.app,key);
		var token = req.body.token;
		if (app == "AppTaxi") {
			client.profile(token,function(found){
				res.json(found);
			});
		} else if (app == "AppTaxiDriver") {
			driver.profile(token,function(found){
				res.json(found);
			});
		}
	});

  app.post('/logout',function(req,res){
		var key = method.key(req.body.key);
		var app = method.decode(req.body.app,key);
		var token = req.body.token;
		if (app == "AppTaxi") {
			client.logout(token,function(found){
				res.json(found);
			});
		} else if (app == "AppTaxiDriver") {
			driver.logout(token,function(found){
				res.json(found);
			});
		}
	});

	app.post('/getDriver',function(req,res){
		var token = req.body.token;
		driver.getDriver(token,function(found){
			res.json(found);
		});
	});

	app.post('/getAllReclamation',function(req,res){
		var token = req.body.token;
		reclamation.getAllReclamation(token,function(found){
			res.json(found);
		});
	});

	app.post('/addReclamation',function(req,res){
		var key = method.key(req.body.key);
		var token = req.body.token;
		var username = method.decode(req.body.username,key);
		var subject = method.decode(req.body.subject,key);
		var message = method.decode(req.body.message,key);
		reclamation.addReclamation(token,username,subject,message,function(found){
			res.json(found);
		});
	});

	app.post('/getAllMessage',function(req,res){
		var idRec = req.body._id;
		reclamation.getAllMessage(idRec,function(found){
			res.json(found);
		});
	});

	app.post('/addMessage',function(req,res){
		var key = method.key(req.body.key);
		var idRec = req.body._id;
		var message = method.decode(req.body.message,key);
		reclamation.addMessage(idRec,message,function(found){
			res.json(found);
		});
	});

	app.post('/getAllService',function(req,res){
		service.getAllService(function(found){
			res.json(found);
		});
	});

	app.post('/addBook',function(req,res){
		var tokenDriver = req.body.tokenDriver;
		var nameDriver = req.body.username;
		var tokenClient = req.body.tokenClient;
		var nameClient = req.body.fname;
		var originLatitude = parseFloat(req.body.originLatitude);
		var originLongitude = parseFloat(req.body.originLongitude);
		var desLatitude = parseFloat(req.body.desLatitude);
		var desLongitude = parseFloat(req.body.desLongitude);
		var pcourse = parseFloat(req.body.pcourse);
		var ptake = parseFloat(req.body.ptake);
		var preturn = parseFloat(req.body.preturn);
		book.addBook(tokenDriver,nameDriver,tokenClient,nameClient,originLatitude,originLongitude,desLatitude,desLongitude,pcourse,ptake,preturn,function(found){
			res.json(found);
		});
	});

	app.post('/addNote',function(req,res){
		var idBook = req.body._id;
		var tokenDriver = req.body.tokenDriver;
		var value = req.body.value;
		book.addNote(idBook,tokenDriver,value,function(found){
			res.json(found);
		});
	});

	app.post('/addBookAdvance',function(req,res){
		var key = method.key(req.body.key);
		var date = method.decode(req.body.date,key);
		var latitude = method.decode(req.body.latitude,key);
		var longitude = method.decode(req.body.longitude,key);
		var repeat = method.decode(req.body.repeat,key);
		var description = method.decode(req.body.description,key);
		if (repeat == 'true') {
			var mon = method.decode(req.body.mon,key);
			var tue = method.decode(req.body.tue,key);
			var wed = method.decode(req.body.wed,key);
			var thu = method.decode(req.body.thu,key);
			var fri = method.decode(req.body.fri,key);
			var sat = method.decode(req.body.sat,key);
			var sun = method.decode(req.body.sun,key);
			book.addBookAdvanceWithRepeat(latitude,longitude,date,description,mon,tue,wed,thu,fri,sat,sun,function(found){
				res.json(found);
			});
		} else {
			book.addBookAdvanceWithoutRepeat(latitude,longitude,date,description,function(found){
				res.json(found);
			});
		}
	});

	app.post('/getTaxiDriving',function(req,res){
		var token = req.body.token;
		driver.getTaxi(token,function(found){
			res.json(found);
		});
	});

	app.post('/searchTaxi',function(req,res){
		var serial = req.body.serial;
		taxi.getTaxi(serial,function(found){
			res.json(found);
		});
	});

	app.post('/addTaxiToDriver',function(req,res){
		var token = req.body.token;
		var idTaxi = req.body._id;
		taxi.addTaxiToDriver(token,idTaxi,function(found){
			res.json(found);
		});
	});

	app.post('/editTaxiFromDriver',function(req,res){
		var token = req.body.token;
		var idTaxi = req.body._id;
		var working = (req.body.working == "true") ? true : false;
		driver.editTaxiFromDriver(token,idTaxi,working,function(found){
			res.json(found);
		});
	});

	app.post('/haveTaxi',function(req,res){
		var token = req.body.token;
		driver.haveTaxi(token,function(found){
			res.json(found);
		});
	});

	app.post('/disableAccountBook',function(req,res){
		var token = req.body.token;
		driver.disableAccountBook(token,function(found){
			res.json(found);
		});
	});
}
