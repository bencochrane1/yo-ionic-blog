angular.module('starter.controllers', [])


.controller('AppCtrl', ['$scope', 'Blog', '$state', '$stateParams', '$ionicModal', '$timeout', function ($scope, $state, $stateParams, Blog, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}])


.controller('BlogController', ['$scope','Blog', '$location', function ($scope, Blog){

    var id = window.location.href.split("/").slice(-1)[0]
    Blog.get(id).success( function (data) {
      $scope.blog = data;
    })

    $scope.goToEditOnClick = function () {
      window.location.href = '#/app/blog/edit/' + id;
    }


}])

.controller('BlogListController',['$scope','Blog', function ($scope, Blog){

    Blog.getAll().success( function (data){
        $scope.blogs = data.results;
    });  

    $scope.onBlogDelete = function (blog){
        Blog.delete(blog.objectId);
        $scope.blogs.splice($scope.blogs.indexOf(blog),1);
    }

}])

.controller('BlogCreationController',['$scope','Blog','$state',function ($scope, Blog, $state){

    $scope.blog = {};

    $scope.create = function () {
        Blog.create({
            content:    $scope.blog.content,
            author:     $scope.blog.author,
            coverImage: $scope.blog.coverImage,
            title:      $scope.blog.title

        }).success(function(data){
            console.log("it got added");
            console.log($state)
            $state.go('app.blogs');
        });
    }
}])

.controller('BlogEditController',['$scope','Blog','$state','$stateParams',function ($scope, Blog, $state, $stateParams){

    $scope.blog = {
        id:         $stateParams.id,
        content:    $stateParams.content,
        author:     $stateParams.author,
        coverImage: $stateParams.coverImage,
        title:      $stateParams.title        
    };

    $scope.edit = function () {
        Blog.edit($scope.blog.id,{
            content:    $scope.blog.content,
            author:     $scope.author,
            coverImage: $scope.coverImage,
            title:      $scope.title
        })
        .success(function(data){
            $state.go('app.blogs');
        });
    }

}]);



