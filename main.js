var app = angular.module('FirstApplication',[]);

//angular.module('FirstApplication')
app.controller('MainController',function($scope){
    $scope.activeTab = 0;
  $scope.product  ={
      id:1,
      description:"bla bla",
      img:"http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",
      comments:[
          {
              author:"author1",
              message:"hello1"
          },
          {
              author:"author2",
              message:"hello2"
          }
      ]
  }
})