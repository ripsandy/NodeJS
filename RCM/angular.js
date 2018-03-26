var myApp = angular.module("myModule",[]);

var myController = function($scope){
$scope.message = "Hi Whatsup";
};

var test = function($scope){
$("#login").click(function(){
    $("#loader").show();

    
    $("#loader").hide();
});
};

var pass = function($scope){
    $scope.message;
};

myApp.controller("myController",myController);
myApp.controller("test",test);
myApp.controller("pass",pass);
