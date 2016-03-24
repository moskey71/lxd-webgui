'use strict';

angular.module('myApp.remoteimage', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/remoteimages', {
            title: 'Remoteimages',
            templateUrl: 'modules/remoteimage/remoteimages.html',
            controller: 'remoteimageListCtrl',
        })
        .when('/remoteimage-view/:imageID', {
            title: 'Remoteimages',
            templateUrl: 'modules/remoteimage/image-view.html',
            controller: 'remoteimageViewCtrl',
            resolve: {
                image: function (RemoteimageServices, $route) {
                    return RemoteimageServices.getByFingerprint($route.current.params.imageID)
                }
            }
        })
        .when('/remoteimage-add', {
            title: 'Remoteimages',
            templateUrl: 'modules/remoteimage/image-add-remote.html',
            controller: 'remoteimageAddRemoteCtrl',
            resolve: {}
        })
        ;
    }])


    .controller('remoteimageViewCtrl', function ($scope, $routeParams, $filter, $location,
                                                 remoteimages, RemoteimageServices, ImageServices) {
        $scope.remoteimages = remoteimages.data;
    })


    .controller('remoteimageListCtrl', function ($scope, $routeParams, $filter, $location,
                                                RemoteimageServices, ImageServices)
    {
        $scope.remoteimages = [];
        $scope.filter = {
          search: '',
        };
        $scope.architectures = [
          'amd64',
          'i386',
          'armhf',
          'arm64',
          'ppc64el',
        ];

        $scope.reload = function() {
          RemoteimageServices.getByFilter($scope.filter).then(function(data) {
            $scope.remoteimages = data[0].concat(data[1]);
            $scope.errorMsg = "";
          }, function(error) {
            $scope.errorMsg = "Connection error. Could not retrieve data.";
          })
        }

        $scope.addRemoteimage = function (remoteimage) {
          ImageServices.addSourceImageRepo(remoteimage);
        }

        $scope.reload();
    })


    .controller('remoteimageAddRemoteCtrl', function ($scope, $routeParams, $filter, $location, RemoteimageServices) {
        $scope.addRemoteImage = function () {
            RemoteimageServices.addRemoteImage($scope.url);
        }

        $scope.addSourceImage = function () {
            RemoteimageServices.addSourceImage();
        }
    })
;
