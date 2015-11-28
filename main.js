var app = angular.module('FirstApplication',[]);

//angular.module('FirstApplication')
app.controller('MainController',function($scope){
    $scope.activeTab = 0;
    $scope.newComment = '';


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

    $scope.postComment = function() {

        $service("product", function($q, $timeout) {
            var def = $q.deffered();

            $.timeout(function(){
                def.resolve(data)
            }, 2000)

            return def.promise()
        })

        $service.then(function() {
            if($scope.newComment == '') {
                alert('Comment is empty!')
                return
            }
            $scope.product.comments.push({
                author: 'newauthor',
                message:$scope.newComment
            })
        }, function() {})

    }
/*
    if($scope.newComment == '') {
        alert('Comment is empty!')
        return
    }
    $scope.product.comments.push({
        author: 'newauthor',
        message:$scope.newComment
    })
    */
})