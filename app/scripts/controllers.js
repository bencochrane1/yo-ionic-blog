angular.module('starter.controllers', [])


.controller('AppCtrl', function ($scope, $state, $stateParams, Blog, $ionicModal, $timeout) {
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
})


.controller('BlogController', ['$scope','Blog', '$location', function ($scope, Blog){

    var id = window.location.href.split("/").slice(-1)[0]
    Blog.get(id).success( function (data) {
      $scope.blog = data;
    })

    $scope.goToEditOnClick = function () {
      window.location.href = '#/app/blog/edit/' + id;
    }


}])

.controller('BlogListController', function ($scope, Blog){

    Blog.getAll().success( function (data){
        $scope.blogs = data.results;
    });  

    $scope.delete = function (blog){
        // Blog.delete(blog.objectId);
        $scope.blogs.splice($scope.blogs.indexOf(blog),1);
    }

})

.controller('BlogCreationController', function ($scope, Blog, $state){

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
})

.controller('BlogEditController', function ($scope, Blog, $state, $stateParams, $log){


    Blog.get($stateParams.id).success( function (data) {
      $scope.blog = data;
      console.log(data);
    }).error( function (err) {
      $log.error(err);
    })

    $scope.edit = function () {
      alert('editing')
        Blog.edit($scope.blog.objectId,{
            content:    $scope.blog.content,
            author:     $scope.author,
            coverImage: $scope.coverImage,
            title:      $scope.title
        })
        .success(function(data){
          alert('it saved');
            $state.go('app.blogs');
        });
    }

    $scope.delete = function (){
        Blog.delete($scope.blog.objectId).success( function () {
          $state.go('app.blogs');
        })
        // $scope.blogs.splice($scope.blogs.indexOf(blog),1);
    }    

});



