"use strict";

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $state, $rootScope) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {

      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.blogs', {
    url: '/blogs',
    views: {
      'menuContent': {
        controller: 'BlogListController',
        templateUrl: "views/blogs.html"
      }
    }
  })

  .state('app.blog', {
    url: "/blog/:id",
    views: {
      'menuContent': {
        controller: 'BlogController',
        templateUrl: "views/blog.html"
      }
    }
  })

  .state('app.createBlog', {
    url: "/blog/new",
    views: {
      'menuContent': {
        controller: 'BlogCreationController',
        templateUrl: "views/create-blog.html"
      }
    }
  })

  .state('app.editBlog', {
    url: "/blog/edit/:id",
    views: {
      'menuContent': {
        controller: 'BlogEditController',
        templateUrl: "views/edit-blog.html"
      }
    }
  })

  $urlRouterProvider.otherwise('/app/blogs');
});
