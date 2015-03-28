var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var expressValidator = require('express-validator');
var mongojs = require('mongojs');													//index,uploadImage
var posts = mongojs('mehendiDB',['Posts']);											//index,uploadImage
var users = mongojs('mehendiDB',['Users']);											//index,
var likes = mongojs('mehendiDB',['Likes']);
var multer  = require('multer');													// Module for file upload.
var home = require('./routes/home/index');
var uploadImage = require('./routes/uploadImage/uploadImage');
var search = require('./routes/search/search');
var clickImage = require('./routes/clickImage/clickImage');
var userProfile = require('./routes/userProfile/userProfile');
var comments = require('./routes/comments/comments');


app.use(express.static(__dirname + "/public"));										// html and controller file
app.use(bodyParser.json());
app.use('/', home);
app.use('/uploadImage',uploadImage);
app.use('/api',uploadImage);
app.use('/search',search);
app.use('/clickImage',clickImage);
app.use('/userProfile',userProfile);
app.use('/comments',comments);
// ===================================================== HOME PAGE ============================================================

// var initUsrName = [];							// stores usernames and dp path
// var row = {};									// stores one record of json data 
// var result = [];								// stores array of rows which is returned to caller

// function namesInitialize(){
// 	users.Users.find({},{ _id : 1, userName : 1, DPPath : 1 }, function(err, docs){			// queries Users table to get all user's userName and DPPath
//  			 	docs.forEach( function(doc){
//  			 		initUsrName.push(doc);											// pop in userName and DPPath into initUsrName array
//  			 	});
//  	});
// }
// function getNamesArray(id){
// 	initUsrName.forEach( function(doc){
// 		if( doc._id.toString() === id.toString() ){									// check condition 
// 			row.uid = doc._id;
// 			row.userName = doc.userName;											// if user id which is passed matches with user id from initUsrName array
// 			row.DPPath = doc.DPPath;												// then take the userName and DPPath and store it in	
// 		}																			// row json variable
// 	});
// }

// app.get('/popular', function(req, res){													// get request handler on '/home' route
// 	namesInitialize();
// 	result = [];

// 	posts.Posts.find({ tags : "Common" }).sort({ cntLikes : -1}).skip(0).limit(20, function(err, docs){					// queries Posts table to get the most popular post from post
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
// app.post('/popular', function(req, res){													// get request handler on '/home' route
// 	namesInitialize();
// 	result = [];
	
// 	var strt = parseInt(req.body.beg);
// 	var tagName = req.body.tagName;
// 	console.log(tagName);
// 	// console.log(strt);
// 	posts.Posts.find({tags : { $in : tagName }}).sort({ cntLikes : -1}).skip(strt).limit(20, function(err, docs){					// queries Posts table to get the most popular post from post
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
// app.get('/recent', function(req, res){													// get request handler on '/home' route
// 	namesInitialize();
// 	result = [];

// 	posts.Posts.find({ tags : "Common" }).sort({ uploadDate : -1}).skip(0).limit(11, function(err, docs){					// queries Posts table to get the most popular post from post
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
// app.post('/recent', function(req, res){													// get request handler on '/home' route
// 	namesInitialize();
// 	result = [];
	
// 	var strt = parseInt(req.body.beg);
// 	var tagName = req.body.tagName;
// 	posts.Posts.find({ tags : tagName }).sort({ uploadDate : -1}).skip(strt).limit(5, function(err, docs){					// queries Posts table to get the most popular post from post
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








// app.post('/toggle', function(req, res){
// 	namesInitialize();
// 	result = [];

// 	var tagName = req.body.tagName;
// posts.Posts.find( { tags : tagName }, function(err, docs)

// });



// =========================================== UPLOAD PAGE ==========================================================

// var done=false;
// var postId;

// app.use(multer({ dest: './uploads/',
//  rename: function (fieldname, filename) {
//     console.log("renaming file....");
//     return filename+Date.now();
//   },
// onFileUploadStart: function (file) {
//   console.log(file.originalname + ' is starting ...')
// },
// onFileUploadComplete: function (file) {
//   console.log(file.fieldname + ' uploaded to  ' + file.path)
//   done=true;
// }
// }));

// /*Handling routes.*/

// app.get('/imageUpload',function(req,res){
//       res.sendfile("./public/upload.html");
// });

// app.post('/api/photo',function(req,res){
//   console.log("recieving image upload request.... file name :" + req.files.userPhto.name)
//   if(done==true){
//     console.log(req.files);
//     posts.Posts.insert({ "uid" : mongojs.ObjectId("55041cd4c20ec607edaf772b"), "description" : "Image 12", "caption" : req.files.userPhto.name, "imagePath" : req.files.userPhto.path, "tags" : [ ], "cntLikes" : 20, "cntShares" : 13, "cntComments" : 7, "uploadDate" : new Date() }, function(err, docs){
//          postId = docs._id.toString();
//          console.log(" new post id is : " + postId);    
//     });
//     res.send("File uploaded.");
//   }
// });

// ============================================ Image Click Page ======================================================

// var imageResult = {};
// var liked = false;
// function isLiked(uID,pID){
// 	likes.Likes.find({ uid : mongojs.ObjectId(uID), pid : mongojs.ObjectId(pID)}, function (err, docs){
// 		console.log("Docs contain : " + docs.length);
// 		if(docs.length){
// 			imageResult.liked = true;
// 		}else{
// 			imageResult.liked = false;
// 		}
// 	});
// }

// function incrementLikes(pID){
// 	posts.Posts.update({ _id : mongojs.ObjectId(pID) }, { $inc : { cntLikes : 1 }}, function(err, docs){
// 		if(docs.length){
// 		console.log("like count incremented...");
// 		}
// 	});
// }
// function decrementLikes(pID){
// 	posts.Posts.update({ _id : mongojs.ObjectId(pID) }, { $inc : { cntLikes : -1 }}, function(err, docs){
// 		if(docs.length){
// 		console.log("like count decremented...");
// 		}
// 	});
// }


// app.get('/imageInfo', function(req, res){
// 	console.log("recieving image info get request......");
// 	res.sendfile("./public/click.html");
// });

// app.post('/imageInformation', function(req, res){
// 	console.log("recieving image info post request......");
// 	console.log( " Post ID is : " + req.body.postID);
// 	var pid = req.body.postID;
// 	var uid = req.body.userID;
// 	imageResult = {};
// 	isLiked(uid,pid);
	
// 	posts.Posts.findOne({_id: mongojs.ObjectId(pid)},{ _id : 1, imagePath : 1, description : 1, cntLikes : 1, cntComments : 1 }, function (err, docs){
// 		// console.log(docs);
// 		imageResult.postId = docs._id;
// 		imageResult.imagePath = docs.imagePath;
// 		imageResult.des = docs.description;
// 		imageResult.cntLikes = docs.cntLikes;
// 		imageResult.cntComments = docs.cntComments;
// 		//console.log(imageResult);
// 		console.log("image request executed successfully.");
// 		res.send(imageResult);
// 	});
		
		
// });


// app.post('/likeClicked', function(req, res){
// 	var pid = req.body.postID;
// 	var uid = req.body.userID;
// 	incrementLikes(pid);
// 	likes.Likes.insert({ "pid" : mongojs.ObjectId(pid), "uid" : mongojs.ObjectId(uid) },function (err, docs){
// 		console.log(docs._id);
// 		if(docs._id){
// 			console.log(docs);
// 			res.send("success");
// 		}else{
// 			res.send("failure");	
// 		}
// 	});
// 	console.log("recieved a insert like request....");
	
// });

// app.post('/UnlikeClicked', function(req, res){
// 	var pid = req.body.postID;
// 	var uid = req.body.userID;
// 	decrementLikes(pid);
// 	likes.Likes.remove({ "pid" : mongojs.ObjectId(pid), "uid" : mongojs.ObjectId(uid) }, 1 ,function (err, docs){
// 		// if(docs._id){
// 		// 	console.log(docs);
// 		// 	res.send("success");
// 		// }else{
// 		// 	res.send("failure");	
// 		// }
// 	});
// });

//============================================= Uploader's Profile Page ==========================================
var uploaderResult = [];
var likeArray = [];
// function initializelikeArray(req, res, next){
// 	likes.Likes.find({ uid : mongojs.ObjectId(req.body.uid) }, { pid : 1 }, function(err, docs){
// 		docs.forEach( function(doc){
//  			likeArray.push(doc.pid);											// pop in userName and DPPath into initUsrName array
//  		});
// 	});
// 	next(req, res);
// }
// function abc(req, res)
// {

// }

// app.get('/uploaderInfo',function(req, res){
// 	res.sendfile("./public/uploaderProfile.html");
// });

// app.post('/uploaderInfo', function(req, res){
// 	var uID = req.body.uid;
// 	users.Users.find({ _id : mongojs.ObjectId(uID) },function (err, docs){
// 		res.send(docs[0]);
// 	});
// });

// app.post('/uploaderPost', function(req, res){
// 	var uID = req.body.uid;
// 	var start = parseInt(req.body.strt);
// 	posts.Posts.find({ uid : mongojs.ObjectId(uID) }).skip(start,function (err, docs){
// 	res.send(docs);
// 	});
// });

app.post('/uploaderLike',function(req, res, next){
	likeArray = [];
	// var uID = req.body.uid;
	// var start = parseInt(req.body.strt);
	// initializelikeArray(uID);
	console.log("inside first middleware");
	console.log("user id is " + req.body.uid);
	likes.Likes.find({ uid : mongojs.ObjectId(req.body.uid) }, { pid : 1 }, function(err, docs){
		docs.forEach( function(doc){
 			likeArray.push(doc.pid);
 		});	
	});
	// console.log(likeArray);
	next();
}, function(req, res, next){
	console.log("inside second middleware");
	
	res.send("End of Middleware execution....");
});










































// app.post('/postreq', function( req, res){
// 	getData(req, res);
// });
// app.use('/postreq',home1);
// app.use('/home',home);





//app.use('/home1',home1);

// app.use(expressValidator());

// app.get('/hemo1',function(req, res){
// 	getData(req,res);
// });

 // function getName(id){
 // 	users.Users.find({_id: mongojs.ObjectId(id)}, function(err, docs){
 // 			 	console.log(docs[0].userName);
 // 	});
 // }

// function printArray(){
// 	console.log(ussrName[0].userName);
// }
// var initUsrName = [];
// // var usrName = [];
// // var usrDP = [];
// var row = {};
// var result = [];
// function namesInitialize(){
// 	users.Users.find({},{ userName : 1, DPPath : 1 }, function(err, docs){
//  			 	docs.forEach( function(doc){
//  			 		initUsrName.push(doc);
//  			 	});
//  			 	// console.log(ussrName);
//  	});
// }
// function getNamesArray(id){
// 	initUsrName.forEach( function(doc){
// 		//console.log(typeof doc._id);
// 		if( doc._id.toString() === id.toString() ){
// 			console.log(doc.userName);
// 			row.userName = doc.userName;
// 			console.log(doc.DPPath);
// 			row.DPPath = doc.DPPath;
// 		}
// 	});
// 	console.log("************************");
// }
// function getUsers(){
// 	users.Users.find( function(err, docs){
// 			 console.log(docs);
// 	});
// }
// function getPosts(){
// 	posts.Posts.find(function(err, docs){
// 			console.log(docs);
// 	});
// }
// app.get('/home', function(req, res){
// 	console.log("I received a GET request");
// 	var usrId = [];
// 	// var usrName = [];
// 	// var usrDP;
// 	var imagePath;
// 	var cntLikes;
// 	var i = 1;
// 	var dumydocs = [];

// 	// getUsers();
//  //    getPosts();

// 	// console.log(userss);
// 	// console.log(postdtl);
// 		namesInitialize();
// 	 	posts.Posts.find(function(err, docs){
// 	 			// printArray();
// 	 		var arrayLength = docs.length;
// 			for (var i = 0; i < arrayLength; i++) {
//     			console.log(docs[i].uid);
//     			row.imagePath = docs[i].imagePath;
//     			row.cntLikes = docs[i].cntLikes;
//     			//Do something
//     			getNamesArray(docs[i].uid);
//     			result.push(row);
//     			row = {};
// 			}
// 			console.log("==================================");

// 			console.log(result);



// 	// 		// getName(docs[0].uid);


// 	// 		// usrId = docs[0].uid;
// 	// 		// console.log(usrId);
// 	// 		// var data = JSON.parse(docs);
// 	 					// docs.forEach( function(doc){
// 	 					// 	  usrId.push(doc.uid);
// 	 					// 	  console.log(doc.uid);
// 	 					// 	 // getName(doc.uid);
							
// 	 					// 	// var data = JSON.parse(doc);
// 	 					//     // dumydocs.push(doc);
// 	 					// });

// 	// 					 // console.log(dumydocs);
// 	// 		// console.log(usrId);
// 	// 		// console.log(usrName);				 
			
// 	// 					// console.log(usrId.length);
// 	// 					// for(i = 0; i < usrId.length; i++){
// 	// 					//     console.log(usrId[i]);
// 	// 					//     getName(usrId[i]);
// 	// 					// }
// 	// 		// usrId.forEach( function(usr){
// 	// 		// 	// users.Users.find({_id: mongojs.ObjectId(usr)}, function(err, docs){
// 	// 		// 	// 	console.log(docs[0].userName);
// 	// 		// 	// });
// 	 			// res.json(docs);
// 	 			res.send(result);
// 	 		 });



// 	// 	 	// usrName.forEach( function(usr){
// 	// 		// 	console.log(usr);
// 	// 		// });
// 	// 		// dumydocs = docs;
// 	// 		// console.log(docs);
// 	// 		// res.json(docs);	
// 	// 	});
// 	//  // usrId.forEach( function(doc){
// 	// 	  	// users.Users.find({_id: mongojs.ObjectId(doc)}, function (err, docs){
// 	// 	  		// usrName.push(docss.userName);
// 	// 	  		// console.log(doc);
// 	// 	  	// });
// 	//  // });

// 	// console.log(dumydocs);	
// 	// // res.json(dumydocs);
// });

app.listen(3000);
console.log("Mehendi App Server running on 3000...");