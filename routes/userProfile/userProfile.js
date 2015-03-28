var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var posts = mongojs('mehendiDB',['Posts']);
var users = mongojs('mehendiDB',['Users']);
var likes = mongojs('mehendiDB',['Likes']);
var bodyParser = require('body-parser');
var Promise = require('bluebird');

router.use(bodyParser.json());
var likeArray = [];
var result = [];
var row = {};
var cntArray;
function initializeLikeArray(uID){
	likeArray = [];
	likes.Likes.find({ uid : mongojs.ObjectId(uID) },{ _id : 0, pid : 1 },function(err, docs){
		// console.log(docs);
		// res.send(docs);
		// likeArray = docs;
		docs.forEach( function(doc){
 			 	likeArray.push(doc.pid);													// pop in userName and DPPath into initUsrName array
 		});
 		console.log("likearrray",likeArray);
		// cntArray = docs.length;
		// return likeArray;
	});
	// console.log("after",likeArray);
}

function printArray(){
	console.log("printarray",likeArray);
}
router.get('/',function(req, res){
	res.sendfile("./public/userProfile.html");
});

router.post('/', function(req, res){
	var uID = req.body.uid;
	users.Users.find({ _id : mongojs.ObjectId(uID) },function (err, docs){
		res.send(docs[0]);
	});
});
router.post('/post', function(req, res){
	var uID = req.body.uid;
	var start = parseInt(req.body.strt);
	posts.Posts.find({ uid : mongojs.ObjectId(uID) }).skip(start,function (err, docs){
	res.send(docs);
	});
});

router.post('/like', function(req, res){
	
	var uID = req.body.uid;
	var start = parseInt(req.body.strt);
	initializeLikeArray(uID);

	// var likeArray = [];
	
	// printArray();
	// console.log(likeArray);
	// likeArray.forEach( function(doc){
	// 	console.log("print doc : " + doc);
		
	// });
	posts.Posts.find({ _id : mongojs.ObjectId(likeArray[0]) }).skip(0,function (err, docs){
			console.log("Inside docs : " + docs);
		});
	res.send("Success");
});

var callbackPromise = function(uID){
	return new Promise(function (resolve, reject){
		likeArray = [];
		likes.Likes.find({ uid : mongojs.ObjectId(uID) },{ _id : 0, pid : 1 },function (err, docs){
			if(err){ reject(err); }
			else{
				docs.forEach( function(doc){
 			 		likeArray.push(doc.pid);													// pop in userName and DPPath into initUsrName array
 				});	
 				resolve(likeArray);
			}			
		});
	});
};

var callbackPromise1 = function(){
	return new Promise(function (resolve, reject){
		result = [];
				posts.Posts.find({ _id : { $in : likeArray }},{ _id : 1, imagePath : 1, description : 1, cntLikes : 1, cntComments : 1 }, function (err, docs){
					if(err){ reject(err)}
					else{
					var len = docs.length;
					for (var i = 0; i < len; i++) {
							row._id = docs[i]._id;
							row.imagePath = docs[i].imagePath;
							row.cntLikes = docs[i].cntLikes;
							console.log(row);
							result.push(row);
							console.log("result is : " + result);
							row = {};
						}
					}
					resolve(result);
				});	
			// }
		
	});
};

function callfn(){

}


router.post('/promise',function (req, res, callfn){
	var uID = req.body.uid;
	var start = parseInt(req.body.strt);
	
	callbackPromise(uID)
	.then(function(likeArray){
		console.log("like Array : " + likeArray);
		callbackPromise1()
		.then(function(result){
			console.log("inside 2nd callback : " + result);
			res.send(result);	
		})
		.catch(function(err){
			console.log("Error is : " + err);
		})		
		// callfn(req, res);
	})
	.catch(function(err){
		console.log("Error is : " + err);
	})
});
module.exports = router;