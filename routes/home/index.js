var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var posts = mongojs('mehendiDB',['Posts']);
var users = mongojs('mehendiDB',['Users']);
var bodyParser = require('body-parser');

router.use(bodyParser.json());


var initUsrName = [];							// stores usernames and dp path
var row = {};									// stores one record of json data 
var result = [];								// stores array of rows which is returned to caller



function namesInitialize(){
	users.Users.find({},{ _id : 1, userName : 1, DPPath : 1 }, function(err, docs){			// queries Users table to get all user's userName and DPPath
 			 	docs.forEach( function(doc){
 			 		initUsrName.push(doc);													// pop in userName and DPPath into initUsrName array
 			 	});
 	});
}
function getNamesArray(id){
	initUsrName.forEach( function(doc){
		if( doc._id.toString() === id.toString() ){											// check condition 
			row.uid = doc._id;
			row.userName = doc.userName;													// if user id which is passed matches with user id from initUsrName array
			row.DPPath = doc.DPPath;														// then take the userName and DPPath and store it in	
		}																					// row json variable
	});
}

// router.get('/popular', function(req, res){												// get request handler on '/home' route
// 	namesInitialize();
// 	result = [];

// 	posts.Posts.find({ tags : "Common" }).sort({ cntLikes : -1}).skip(0).limit(20, function(err, docs){	// queries Posts table to get the most popular post from post
//  		var arrayLength = docs.length;
// 		for (var i = 0; i < arrayLength; i++) {
// 			row.imageId = docs[i]._id;
// 			row.imagePath = docs[i].imagePath;
// 			row.cntLikes = docs[i].cntLikes;
// 			getNamesArray(docs[i].uid);
// 			result.push(row);
// 			row = {};
// 		}
// 		res.send(result);
// 	});
// });
router.post('/popular', function(req, res){													// post request handler on '/popular' route 
	namesInitialize();
	result = [];
	
	var strt = parseInt(req.body.beg);														// getting the beggining of respense
	var tagName = req.body.tagName;															// getting the tagName to filter the response

	posts.Posts.find({tags : { $in : tagName }}).sort({ cntLikes : -1}).skip(strt).limit(20, function(err, docs){ // queries Posts table to get the most popular post from post
 		var arrayLength = docs.length;
		for (var i = 0; i < arrayLength; i++) {
			row.imageId = docs[i]._id;
			row.imagePath = docs[i].imagePath;
			row.cntLikes = docs[i].cntLikes;
			getNamesArray(docs[i].uid);
			result.push(row);
			row = {};
		}
		console.log(result);
		res.send(result);
	});
});
// router.get('/recent', function(req, res){												// get request handler on '/home' route
// 	namesInitialize();
// 	result = [];

// 	posts.Posts.find({ tags : "Common" }).sort({ uploadDate : -1}).skip(0).limit(20, function(err, docs){// queries Posts table to get the most popular post from post
//  		var arrayLength = docs.length;
// 		for (var i = 0; i < arrayLength; i++) {
// 			row.imageId = docs[i]._id;
// 			row.imagePath = docs[i].imagePath;
// 			row.cntLikes = docs[i].cntLikes;
// 			getNamesArray(docs[i].uid);
// 			result.push(row);
// 			row = {};
// 		}
// 		res.send(result);
// 	});
// });
router.post('/recent', function(req, res){													// get request handler on '/home' route
	namesInitialize();
	result = [];
	
	var strt = parseInt(req.body.beg);
	var tagName = req.body.tagName;
	posts.Posts.find({tags : { $in : tagName }}).sort({ uploadDate : -1}).skip(strt).limit(20, function(err, docs){					// queries Posts table to get the most popular post from post
 		var arrayLength = docs.length;
		for (var i = 0; i < arrayLength; i++) {
			row.imageId = docs[i]._id;
			row.imagePath = docs[i].imagePath;
			row.cntLikes = docs[i].cntLikes;
			getNamesArray(docs[i].uid);
			result.push(row);
			row = {};
		}
		res.send(result);
	});
});
module.exports = router;