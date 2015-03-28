var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var posts = mongojs('mehendiDB',['Posts']);
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.get('/',function(req,res){
	 res.sendfile("./public/editPic.html");
});
router.post('/', function(req, res){													// post request handler on '/search' route 
	var pid = req.body.pID;															// getting the tagName to filter the response
	// console.log(tagName + " " + strt);
	posts.Posts.find({ _id : mongojs.ObjectId(pid)}, function(err, docs){ // queries Posts table to get the most popular post from post
		res.send(docs[0]);
		console.log(docs[0]);
	});
});

router.post('/update', function(req, res){													// post request handler on '/search' route 
	var pid = req.body._id;															// getting the tagName to filter the response
	// console.log(tagName + " " + strt);
	posts.Posts.update({ _id : mongojs.ObjectId(pid)},{ $set : { description : req.body.description, tags : req.body.tags }}, function(err, docs){ // queries Posts table to get the most popular post from post
		res.send("success");
	});
});
module.exports = router;