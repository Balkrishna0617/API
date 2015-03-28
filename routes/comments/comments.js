var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var comments = mongojs('mehendiDB',['Comments']);
var users = mongojs('mehendiDB',['Users']);
var posts = mongojs('mehendiDB',['Posts']);
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
function incrementComments(pID){
	posts.Posts.update({ _id : mongojs.ObjectId(pID) }, { $inc : { cntComments : 1 }}, function(err, docs){
		if(docs.length){
		console.log("Comment count incremented...");
		}
	});
}
// function decrementComments(pID){
// 	posts.Posts.update({ _id : mongojs.ObjectId(pID) }, { $inc : { cntComments : -1 }}, function(err, docs){
// 		if(docs.length){
// 		console.log("Comment count decremented...");
// 		}
// 	});
// }




router.get('/',function(req,res){
	 res.sendfile("./public/comments.html");
});
router.post('/',function(req,res){
	namesInitialize();
	result = [];

	console.log("Recieved Post ID : " + req.body.postID);
	var pid = req.body.postID;

	comments.Comments.find({ "pid" : mongojs.ObjectId(pid)},{ "uid" : 1, "comment" : 1},function(err, docs){
		var arrayLength = docs.length;
		for (var i = 0; i < arrayLength; i++) {
			getNamesArray(docs[i].uid);
			row.comment = docs[i].comment;
			result.push(row);
			row = {};
		}
		res.send(result);
	});

	// res.send("Response from server..");
});

router.post('/post',function(req,res){
	var pid = req.body.postID;
	var uid = req.body.userID;
	var comment = req.body.comment;
	console.log(" POST ID : " + pid);
	console.log(" USER ID : " + uid);
	console.log(" Comment : " + comment);
	incrementComments(pid);

	comments.Comments.insert({"uid" : mongojs.ObjectId(uid), "pid" : mongojs.ObjectId(pid), "comment" : comment, "commentDate" : new Date() }, function(err, docs){
		res.send("Comment posted successfully....");
	});
});


module.exports = router;