var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
// var posts = mongojs('mehendiDB',['Posts']);
var users = mongojs('mehendiDB',['Users']);
// var likes = mongojs('mehendiDB',['Likes']);
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/',function(req, res){
	res.sendfile("./public/login.html");
});
router.post('/',function(req, res){
	var userName = req.body.userName;
	var email = req.body.email;
	var gender = req.body.gender;
	var fbId = req.body.fbId;
	console.log("user name : ",userName);
	users.Users.findOne({ "email" : email },function (err, docs){
		console.log(docs);
		if(docs){
			res.send(docs._id);
			// res.send("User already Exist...");
		}
		else{
			users.Users.insert({ "userName" : userName, "email" : email, "gender" : gender, "age" : 0, "DPPath" : 'http://192.168.2.135:3000/profile/Profile-Icon.png', "fbId" : fbId }, function(err, docs){
			console.log(docs);
			res.send(docs._id);
			});
			
		}
	});
	// res.send("success");
});


module.exports = router;