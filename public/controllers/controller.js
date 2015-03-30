var myApp = angular.module('MehendiApp',[]);
myApp.controller('appCtrl',['$scope','$http',function($scope,$http){

	
	// var refresh = function(){													//commented methods are used for getting response using get request on page load
	// 	console.log("im sending request for popular");
	// 	$http.get('/popular').success(function(response){
	// 		$scope.Posts = response;
	// 	});
	// };
	
	// var recent = function(){
	// 	console.log("im sending request for recent");
	// 	$http.get('/recent').success(function(response){
	// 		$scope.Posts = response;
	// 	});
	// };
	
	$scope.getPopular = function(){													// call to get the popular post on page load and on toggle click and scroll down
		$scope.popular = {
			beg : 0,																// begining of response set used for scroll down
			tagName : ["Common"]													// tagName used for filtering the response on toggle click
		}
		$http.post('/popular', $scope.popular).success(function(response){
			$scope.Posts = response;
			console.log(response);
		});
	};

	$scope.getRecent = function(){													// call to get the recent post on page load and on toggle click and scroll down
		$scope.recent = {
			beg : 0,																// begining of response set used for scroll down
			tagName : ["Common"]													// tagName used for filtering the response on toggle click
		}
		$http.post('/recent', $scope.recent).success(function(response){
			$scope.Posts = response;
		});
	};


	$scope.search = function(){
		// console.log($scope.tags.tagName);
		$scope.tag = {
			beg : 0,																// begining of response set used for scroll down
			tagName : ["Feet Design","Indian"]													// tagName used for filtering the response on toggle click
		}
		$http.post('/search', $scope.tag).success(function(response){
			$scope.Posts = response;
		});
	};

	$scope.getImage = function(){
		console.log("I recieve POST ID : " + $scope.image.postID);
		console.log("I recieve USER ID : " + $scope.image.userID);
		$http.post('/clickImage', $scope.image).success(function(response){
			console.log(response);
		});
	};

	$scope.likeClicked = function(){
		console.log("I recieve POST ID : " + $scope.image.postID);
		console.log("I recieve USER ID : " + $scope.image.userID);
		$http.post('/clickImage/likeClicked', $scope.image).success(function(response){
			console.log(response);
		});
	};

	$scope.unlikeClicked = function(){
		console.log("I recieve POST ID : " + $scope.image.postID);
		console.log("I recieve USER ID : " + $scope.image.userID);
		$http.post('/clickImage/unlikeClicked', $scope.image).success(function(response){
			console.log(response);
		});
	};

	$scope.getComments = function(){
		console.log("I recieve POST ID : " + $scope.posts.postID);
		$http.post('/comments',$scope.posts).success(function(response){
			$scope.Posts = response;
		});
	};


	$scope.postComment = function(){
		console.log("POST ID : " + $scope.posts.postID);
		console.log("USER ID : " + $scope.posts.userID);
		console.log("Comments : " + $scope.posts.comment);
		$http.post('/comments/post', $scope.posts).success(function(response){
			console.log(response);
		});
	};

	$scope.getUserInfo = function(){
		$http.post('/userProfile',$scope.user).success(function(response){
			console.log(response);
			$scope.Profile = response;
		});
	};

	$scope.getUserPost = function(){
		// console.log("inside getUpldrPost() function...");
		// $scope.user = {
		// 	uid : "55041c5ec20ec607edaf7729",
		// 	strt : 0
		// };
		// // console.log($scope.user);
		$http.post('/userProfile/post',$scope.user).success(function(response){
			console.log(response);
			$scope.Posts = response;
		});
	};

	$scope.getUserLike = function(){
		// console.log("inside getUpldrPost() function...");
		// $scope.user = {
		// 	uid : "55041c5ec20ec607edaf7729",
		// 	strt : 0
		// };
		// // console.log($scope.user);
		$http.post('/userProfile/promise',$scope.user).success(function(response){
			console.log(response);
			// $scope.Likes = response;
		});
	};

	$scope.getOwnInfo = function(){
		$http.post('/userProfile',$scope.user).success(function(response){
			console.log(response);
			$scope.User = response;
		});
	};

	$scope.getOwnPost = function(){
		// console.log("inside getUpldrPost() function...");
		// $scope.user = {
		// 	uid : "55041c5ec20ec607edaf7729",
		// 	strt : 0
		// };
		// // console.log($scope.user);
		$http.post('/userHome/post',$scope.user).success(function(response){
			console.log(response);
			$scope.Posts = response;
		});
	};

	$scope.getOwnLike = function(){
		$http.post('/userHome/like',$scope.user).success(function(response){
			console.log(response);
			$scope.Likes = response;
		});	
	}

	$scope.getPostDetail = function(){
		$http.post('/editPic',$scope.image).success(function(response){
			$scope.Post = response;
		});
	}
	$scope.updatePostDetail = function(){
		$scope.abc = {
			_id : "550aced6480aab8b18f8b773",
			description : "My Image",
			tags : ["Bridal", "Common"] 
		}
		$http.post('/editPic/update',$scope.abc).success(function(response){
			console.log(response);
		});	
	}






























	$scope.submit = function(){
		// console.log($scope.lim.beg);
		$scope.tagss = {
			tagName : ["Indian", "Hand Design"]
		}
		console.log($scope.tagss);
		$http.post('/popular', $scope.tagss).success(function(response){
			$scope.Posts = response;
		});
	};

	// $scope.getImage = function(){
	// 	console.log("I recieve POST ID : " + $scope.image.postID);
	// 	console.log("I recieve USER ID : " + $scope.image.userID);
	// 	$http.post('/UnlikeClicked', $scope.image).success(function(response){
	// 		console.log(response);
	// 	});
	// };

	// var getUpldrInfo = function(){
	// 	console.log("inside getUpldrInfo() function...");
	// 	$scope.user = {
	// 		uid : "55041c5ec20ec607edaf7729"
	// 	};
	// 	// console.log($scope.user);
	// 	$http.post('/uploaderInfo',$scope.user).success(function(response){
	// 		console.log(response);
	// 	});
	// };
	// var getUserPost = function(){
	// 	console.log("inside getUpldrPost() function...");
	// 	$scope.user = {
	// 		uid : "55041c5ec20ec607edaf7729",
	// 		strt : 0
	// 	};
	// 	// console.log($scope.user);
	// 	$http.post('/uploaderPost',$scope.user).success(function(response){
	// 		console.log(response);
	// 	});
	// };
	var getUpldrLike = function(){
		console.log("inside getUpldrLike() function...");
		$scope.user = {
			uid : "55041cd4c20ec607edaf772b",
			strt : 0
		};
		console.log($scope.user);
		$http.post('/uploaderLike',$scope.user).success(function(response){
			console.log(response);
		});
	};
	$scope.uploaderPage = function(){
	// getUpldrInfo();
	// getUpldrPost();
		getUpldrLike();
	};

	// refresh();
	// recent();
}]);