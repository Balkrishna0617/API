var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var posts = mongojs('mehendiDB',['Posts']);
var users = mongojs('mehendiDB',['Users']);
var likes = mongojs('mehendiDB',['Likes']);
var bodyParser = require('body-parser');

router.use(bodyParser.json());

var imageResult = {};
var liked = false;

function isLiked(uID,pID){
	likes.Likes.find({ uid : mongojs.ObjectId(uID), pid : mongojs.ObjectId(pID)}, function (err, docs){
		console.log("Docs contain : " + docs.length);
		if(docs.length){
			imageResult.liked = true;
		}else{
			imageResult.liked = false;
		}
	});
}
function incrementLikes(pID){
	posts.Posts.update({ _id : mongojs.ObjectId(pID) }, { $inc : { cntLikes : 1 }}, function(err, docs){
		if(docs.length){
		console.log("like count incremented...");
		}
	});
}
function decrementLikes(pID){
	posts.Posts.update({ _id : mongojs.ObjectId(pID) }, { $inc : { cntLikes : -1 }}, function(err, docs){
		if(docs.length){
		console.log("like count decremented...");
		}
	});
}

router.get('/',function(req,res){
	 res.sendfile("./public/click.html");
});

router.post('/', function(req, res){
	console.log("recieving image info post request......");
	console.log( " Post ID is : " + req.body.postID);
	var pid = req.body.postID;
	var uid = req.body.userID;
	imageResult = {};
	isLiked(uid,pid);
	
	posts.Posts.findOne({_id: mongojs.ObjectId(pid)},{ _id : 1, imagePath : 1, description : 1, cntLikes : 1, cntComments : 1 }, function (err, docs){
		imageResult.postId = docs._id;
		imageResult.imagePath = docs.imagePath;
		imageResult.des = docs.description;
		imageResult.cntLikes = docs.cntLikes;
		imageResult.cntComments = docs.cntComments;
		console.log("image request executed successfully.");
		res.send(imageResult);
	});
		
});

router.post('/likeClicked', function(req, res){
	var pid = req.body.postID;
	var uid = req.body.userID;
	incrementLikes(pid);
	likes.Likes.insert({ "pid" : mongojs.ObjectId(pid), "uid" : mongojs.ObjectId(uid) },function (err, docs){
		console.log(docs._id);
		if(docs._id){
			console.log(docs);
			res.send("success");
		}else{
			res.send("failure");	
		}
	});
	console.log("recieved a insert like request....");	
});
router.post('/unlikeClicked', function(req, res){
	var pid = req.body.postID;
	var uid = req.body.userID;
	decrementLikes(pid);
	likes.Likes.remove({ "pid" : mongojs.ObjectId(pid), "uid" : mongojs.ObjectId(uid) }, 1 ,function (err, docs){
		// if(docs._id){
		// 	console.log(docs);
		// 	res.send("success");
		// }else{
		// 	res.send("failure");	
		// }
	});
});


module.exports = router;