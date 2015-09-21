var app = angular.module('FirstApplication', []);

//angular.module('FirstApplication')
app.service('CommentService',function(){
    var coments = [
        {
            productId:1,
            author: "author1",
            message: "hello1"
        },
        {
            productId:2,
            author: "author2",
            message: "hello2"
        }
    ]
    this.getByProductId = function(id){
        var res =  [];
        for (var i = 0; i < coments.length; i++) {
            var comment = coments[i];
            if(comment.productId ==id)
            res.push(comment)
        }
        return res;
    }
    this.addComment = function(comment){
        coments.push(comment)
        return this.getByProductId(comment.productId)
    }
})
app.service('ProductService',function(){
    var product = {
        id: 1,
        description: "bla bla",
        img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

    }
    var products   = [
        {
            id: 1,
            description: "bla bla",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 2,
            description: "bla bla",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 3,
            description: "bla bla",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
    ]
    this.getProductById = function(id){
        for (var i = 0; i < products.length; i++) {
            var obj = products[i];
            if(obj.id == id)  return obj;
        }

    }
    this.getAll =  function(){
        return products;
    }
})
app.directive('product',function(){



    return {
        scope:{
            product:"=data",
        },
        replace:true,
        restrict:"E",
        controller:'ProductController',
        templateUrl:'./product.template.html'
    }
})
app.controller('ProductsListController',function($scope,ProductService){

    $scope.products  = ProductService.getAll();
})
app.controller('ProductController', function ($rootScope,$scope,CommentService,
                                           ProductService) {

    $rootScope.$broadcast('hrllo',1,2,3)
    $rootScope.$on('hrllo',function(e,data){
        console.log(data)
    })
    $scope.product.comments  = CommentService.getByProductId($scope.product.id);
    $scope.sendComment = function(){
        $scope.newComment.productId = $scope.product.id;
        $scope.product.comments = CommentService.addComment($scope.newComment)
        $scope.newComment = {}
    }
})