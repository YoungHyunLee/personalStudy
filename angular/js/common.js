//'use strict';
var myApp = angular.module('myApp', []);

myApp.directive('customButton', function () {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        /*
        template: '<a href="" class="myawesomebutton" ng-transclude>' +
        '<i class="icon-ok-sign"></i>' +
        '</a>',
        */
        link: function (scope, element, attrs) {
            // DOM 조작과 이벤트 설정은 여기서!
        },
        templateUrl: './public/templates/directive1.html'
    };
});

myApp.filter('reverse', function () {
    return function (input, uppercase) {
        var out = '';
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        console.log(input, uppercase)
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    }
});

// 데이터를 제공하는 컨트롤러
myApp.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.greeting = 'Todd Motto';
}]);

myApp.controller('filter1', ['$scope', function ($scope) {

    $scope.numbers = [10, 25, 35, 45, 60, 80, 100];

    $scope.lowerBound = 42;

    // 필터가 되어줘
    $scope.greaterThanNum = function (item) {
        // 문제의 3번 호출.
        //console.log(item > $scope.lowerBound)
        return item > $scope.lowerBound;
    };

}]);


// 양방향 테스트
myApp.controller('bothWay1', ['$scope', function ($scope) {
    // 빈 문자열로 초기화하고 모델 데이터를 읽어온다.
    $scope.myModel = '';
}]);

// http 테스트
myApp.controller('myHttp1', ['$scope', '$http', function ($scope, $http) {
    // 사용자 객체를 생성
    $scope.user = {};

    // 빈 문자열로 초기화
    $scope.user.username = '';

    // 서버에 사용자 이름을 요청
    $http({
        method: 'GET',
        url: '/public/json/httpJson1.json'
    })
    .success(function (data, status, headers, config) {
        // 서버로부터 받아온 사용자 이름을 모델에 할당!
        $scope.user.username = data.user.name;
    })
    .error(function (data, status, headers, config) {
        // 이런. 뭔가 잘못되었음! :(
    });
}]);

// 선언적 바인딩 테스트
myApp.controller('EmailsCtrl', ['$scope', function ($scope) {

    $scope.emails = {};

    $scope.emails.messages = [{
        "from": "Steve Jobs",
        "subject": "I think I'm holding my phone wrong :/",
        "sent": "2013-10-01T08:05:59Z"
    },{
        "from": "Ellie Goulding",
        "subject": "I've got Starry Eyes, lulz",
        "sent": "2013-09-21T19:45:00Z"
    },{
        "from": "Michael Stipe",
        "subject": "Everybody hurts, sometimes.",
        "sent": "2013-09-12T11:38:30Z"
    },{
        "from": "Jeremy Clarkson",
        "subject": "Think I've found the best car... In the world",
        "sent": "2013-09-03T13:15:11Z"
    }];

    $scope.deleteEmail = function (index) {
        $scope.emails.messages.splice(index, 1)
    };
}]);








































