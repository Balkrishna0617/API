var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');                        
var posts = mongojs('mehendiDB',['Posts']); 
var bodyParser = require('body-parser');
var multer  = require('multer');                          // Module for file upload.

router.use(bodyParser.json());

var done=false;
var postId;

router.use(multer({ dest: './public/uploads/',
 rename: function (fieldname, filename) {
    console.log("renaming file....");
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

/*Handling routes.*/

router.get('/',function(req,res){
      res.sendfile("./public/upload.html");
});

router.post('/photo',function(req,res){
  
  var uid = req.body.userId;
  var desc = req.body.desc;
  var tags;
  if(Array.isArray(req.body.tagName)) {
      tags = req.body.tagName;
  } else {
      tags = [ req.body.tagName ];
  }


  // console.log("User Name is : " + req.body.userId);
  // console.log("User checkbox is Array ?? : " + tags);
  // console.log("recieving image upload request.... file name :" + req.files.userPhoto.name)

  
  if(done==true){   
    posts.Posts.insert({ "uid" : mongojs.ObjectId(uid), "description" : desc, "caption" : req.files.userPhoto.name, "imagePath" : "http://198.165.2.135:3000/uploads/"+req.files.userPhoto.name, "tags" : tags, "cntLikes" : 0, "cntShares" : 0, "cntComments" : 0, "uploadDate" : new Date() }, function(err, docs){
         postId = docs._id.toString();
         console.log(" new post id is : " + postId);
         tags = "";    
    });

    res.send("File uploaded.");
  }
});
module.exports = router;