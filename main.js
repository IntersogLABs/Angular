var app = angular.module('FirstApplication', []);

//angular.module('FirstApplication')
<<<<<<< HEAD
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
=======
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

app.service('ProductService',function($q){
    var product = {
        id: 1,
        description: "pizza1",
        category: "pizza",
        img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

    }
    var products   = [
        {
            id: 1,
            description: "pizza2",
            category: "pizza",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 2,
            description: "pizza3",
            category: "pizza",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 3,
            description: "drink1",
            category: "drink",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 4,
            description: "drink2",
            category: "drink",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 5,
            description: "food1",
            category: "food",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 6,
            description: "food2",
            category: "food",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 7,
            description: "food3",
            category: "food",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 8,
            description: "bla bla 8",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 9,
            description: "bla bla 9",
            img: "http://thumbs.dreamstime.com/z/christmas-basket-goods-26388714.jpg",

        },
        {
            id: 10,
            description: "bla bla 10",
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
        return $q(function(resolve, reject) {
            setTimeout(function(){
                resolve(products)
            }.bind(this), 2000)
        }.bind(this))
    }


})

app.service('OrderService',function($q){
    var orders
    if(localStorage.getItem('orders')) orders = JSON.parse(localStorage.getItem('orders') )
    else {
        orders = []
        localStorage.setItem('orders', JSON.stringify([]))
    }

    this.addOrder = function(order) {
        var found = false;

        orders.forEach(function(item, i ,arr) {
            if(order.id == item.id) {
                found = true;
                item.count++;
            }
        })

        if(!found) {
            order.count = 1
            orders.push(order)
            localStorage.setItem('orders', JSON.stringify(orders))
        }
    }

    this.deleteOrder = function(orderId) {
        console.log(orders)
        orders.forEach(function(item, i, arr) {
            console.log(item)
            if(item.id == orderId) {
                orders.splice(i, 1)
                localStorage.setItem('orders', JSON.stringify(orders))
                return;
            }
        })
    }

    this.getAll = function() {
        return orders;
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

app.directive('order',function(){

    return {
        scope:{
            product:"=data",
        },
        replace:true,
        restrict:"E",
        controller:'ProductController',
        templateUrl:'./order.template.html'
    }
})

app.service('SortedList',function($q){
    var products = []
})

app.controller('ProductsListController',function($scope, ProductService, SortedList, $rootScope, OrderService){

    $scope.filter = function() {
        console.log('clickkkkk')
        var promise = (function(){
            $scope.products = ''
            $('#load').css("display", 'block');
            return ProductService.getAll()
        })()

        promise.then(function (data) {
            $('#load').css("display", 'none');
            console.log(data)
            $scope.products = data
    })
    }

    $scope.showOrder = function() {
        $('.modal-dialog').css('display', 'block')
        $scope.orders = OrderService.getAll();
    }

    $scope.filter()
})

app.controller('ProductController', function ($rootScope,$scope,CommentService, ProductService, OrderService) {

    $scope.product.comments  = CommentService.getByProductId($scope.product.id);
    $scope.sendComment = function(){
        $scope.newComment.productId = $scope.product.id;
        $scope.product.comments = CommentService.addComment($scope.newComment)
        $scope.newComment = {}
    }

    $scope.deleteOrder = function() {
        OrderService.deleteOrder($scope.product.id)
    }

    $('.close-modal').on('click', function() {$('.modal-dialog').css('display', 'none')})

    $scope.addOrder = function() {
        //console.log($scope.product)
        OrderService.addOrder($scope.product)
    }

})


app.filter('filterCat', function() {
        return function(products, input) {
            console.log(input)
            console.log(products)

            if(!input) return products;

            var arr = []

            if(input == 'other') {
                products.forEach(function(item){
                    if(!item.category) arr.push(item)
                })
            } else {
                products.forEach(function(item){
                    if(item.category == input) arr.push(item)
                })
            }

            return arr;
        };
})
>>>>>>> origin/master
