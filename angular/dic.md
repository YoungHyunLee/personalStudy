

http://soomong.net/blog/2014/01/20/translation-ultimate-guide-to-learning-angularjs-in-one-day/

https://docs.angularjs.org/api/ng/directive/ngApp

http://www.w3schools.com/angular/angular_ref_directives.asp




# module 정의.


```html
<div ng-app="myApp">
    text
</div>
```

```js
var myApp = angular.module('myApp', []);
```


# directive 정의



디렉티브는 앱 내에서 DOM을 주입하거나 DOM의 상호작용을 할 때 사용.
DOM 컨트롤용.

```html
<!-- 1: 속성으로 정의 -->
<a custom-button>Click me</a>

<!-- 2: 요소로 정의 -->
<custom-button>Click me</custom-button>

<!-- 3: 클래스로 정의(IE 구버전 호환을 위해) -->
<a class="custom-button">Click me</a>

<!-- 4: 주석으로 정의 (데모로는 별로 안좋긴 하다) -->
<!-- directive: custom-button -->
```

js에서 컨트롤할 때는 다음과 같이 사용할 수 있음.

```js
myApp.directive('customButton', function () {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        template: '<a href="" class="myawesomebutton" ng-transclude>' +
            '<i class="icon-ok-sign"></i>' +
        '</a>',
        link: function (scope, element, attrs) {
            // DOM 조작과 이벤트 설정은 여기서!
        }
        //,templateUrl: 'templates/customButton.html'
        // 탬플릿 내부
        /*
        <script type="text/ng-template" id="customButton.html">
            <a href="" class="myawesomebutton" ng-transclude>
                <i class="icon-ok-sign"></i>
            </a>
        </script>
        */
    };
});
```

반환값의 속성으로 다음의 뜻을 가짐.

* restrict : 요소의 사용을 제한하는 용도이며, A는 속성으로, E는 요소, C는 클래스, M은 주석으로만 사용할 수 있음을 의미.
 동시에 여러 개를 사용할 수도 있음.
* replace : 디렉티브에 정의한 DOM의 마크업을 변경할 수 있음을 의미.
* transclude : 이것을 사용하면 기존의 DOM 내용을 디렉티브 안에 복사할 수 있음.
* template : 주입할 마크업을 의미하고, angular로 컴파일된다.
* templateUrl : 템플릿과 비슷하지만 <script> 태그 혹은 파일을 지정할 때 사용.
 브라우저가 html을 캐싱하므로, 원하지 않으면 <script>태그 안에 선언하면 됨.


# 서비스


기능적인 큰 차이점은 없으나, 디자인 패턴이 다름.
 컨트롤러 등의 안에서 사용할 메소드를 정의한다고 생각하면 되겠음.
 서비스(혹은 팩토리)를 생성할 때는 의존성 주입을 사용해서 Angular에게 새로 만든 서비스의 존재를 알려줘야
 컴파일 에러가 발생하거나 컨트롤러가 동작하지 않을 수 있다.

```js
myApp.service('Math', function () {
  this.multiply = function (x, y) {
    return x * y;
  };
});

// controller
myApp.controller('MainCtrl', ['$scope', function ($scope) {
    var a = 12;
    var b = 24;

    // 결과는 288
    var result = Math.multiply(a, b);
}]);

// 의존성 주입 Math를 주입한다
myApp.controller('MainCtrl', ['$scope', 'Math', function ($scope, Math) {
    var a = 12;
    var b = 24;

    // 결과는 288
    var result = Math.multiply(a, b);
}]);
```


# 팩토리


객체 리터럴을 팩토리 안에서 생성하거나 메소드를 추가할 수 있음.
 이렇게 컨트롤러에 서비스를 주입해서 사용하면 컨트롤러의 코드를 최소로 유지할 수 있음.
 이렇게 사용하여 모듈화를 하는 것.
 서비스는 단일인 느낌이고 팩토리는 서비스를 묶은 느낌(정확하진 않음).

```js
myApp.factory('Server', ['$http', function ($http) {
  return {
    get: function(url) {
      return $http.get(url);
    },
    post: function(url) {
      return $http.post(url);
    },
  };
}]);

// 컨트롤러에 의존성 주입.
myApp.controller('MainCtrl', ['$scope', 'Server', function ($scope, Server) {
    var jsonGet = 'http://myserver/getURL';
    var jsonPost = 'http://myserver/postURL';
    Server.get(jsonGet);
    Server.post(jsonPost);
}]);
```


# 필터


필터는 배열의 데이터와 함께 루프 밖에서도 사용할 수 있고,
 데이터를 순회하면서 특정 조건에 만족하는 데이터만 추리고 싶을 때 사용.
 다만 예제대로 하면 3번을 호출하는데.. 그 이유는 잘 모르겠음..

```js
myApp.filter('reverse', function () {
    return function (input, uppercase) {
        var out = '';
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
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

<div ng-app="myApp">
    <div ng-controller="MainCtrl">
        <p>No filter: {{ greeting }}</p>
        <p>Reverse: {{ greeting | reverse }}</p>
    </div>
</div>

// 필터의 2번째 예제. 이 예제가 3번을 반복함...
myApp.controller('MainCtrl', ['$scope', function ($scope) {
    
    $scope.numbers = [10, 25, 35, 45, 60, 80, 100];
    
    $scope.lowerBound = 42;
    
    // 필터가 되어줘
    $scope.greaterThanNum = function (item) {
        return item > $scope.lowerBound;
    };
    
}]);

// html
<div ng-app="myApp">
    <div ng-controller="MainCtrl">
        <p>Type a few numbers below to watch the filter</p>
        <input type="text" ng-model="lowerBound" />
        <ul>
            <li ng-repeat="number in numbers | filter:greaterThanNum">
                {{ number }}
            </li>
        </ul>
    </div>
</div>
```


# 양방향 데이터 바인딩


완전히 동기화된 데이터라고 표현할 수 있음.
 모델을 갱신하면 뷰에 반연되고, 뷰를 갱신하면 모델에 반영되는 형태.
 
```js
myApp.controller('MainCtrl', ['$scope', function ($scope) {
    // 빈 문자열로 초기화하고 모델 데이터를 읽어온다. 
    $scope.myModel = '';
}]);

// html
<div ng-app="myApp">
    <div ng-controller="MainCtrl">
        <input type="text" ng-model="myModel" placeholder="Start typing..." />
        <p>My model data: {{ myModel }}</p>
    </div>
</div>
```


# XHR/Ajax/$http 호출과 JSON 바인딩


$http 메소드는 angular가 서버 데이터에 접근하는 기능을 래핑한 메소드.
 
```js
myApp.controller('myHttp1', ['$scope', '$http', function ($scope, $http) {  
    // 사용자 객체를 생성
    $scope.user = {};
    
    // 빈 문자열로 초기화
    $scope.user.username = '';
    
    // 서버에 사용자 이름을 요청
    $http({
      method: 'GET',
      url: '//public/json/httpJson1.json'
    })
    .success(function (data, status, headers, config) {
      // 서버로부터 받아온 사용자 이름을 모델에 할당!
      $scope.user.username = data.user.name;
    })
    .error(function (data, status, headers, config) {
      // 이런. 뭔가 잘못되었음! :(
    });
}]);

// html
<div ng-controller="myHttp1">
  <p>{{ user.username }}</p>
</div>
```


# 선언적 데이터 바인딩


angular의 철학은 기능이 풍부한 동적 HTML을 생성해서 웹 클라이언트 측에서는 많은 일을 보이지 않게 처리해주는 것임.
 동적인 HTML 조각을 만들기 위해 애플리케이션이 무엇을 해야 하는지 선언하는게 선언적 바인딩이다.
 ng-repeat는 어떤 콜백이나 상태 변경 없이도 데이터를 순회하며 결과를 렌더링하는 ng-repeat 디렉티브를 사용.

```js
myApp.controller('EmailsCtrl', ['$scope', function ($scope) {

  // 이메일 객체를 생성
  $scope.emails = {};

  // 서버에서 데이터를 받아온 것처럼 꾸며보자. 
  // 그냥 객체의 배열이다.
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

}]);

// html
<ul>
  <li ng-repeat="message in emails.messages">
    <p>From: {{ message.from }}</p>
    <p>Subject: {{ message.subject }}</p>
    <p>{{ message.sent | date:'MMM d, y h:mm:ss a' }}</p>
  </li>
</ul>
```


# Scope 함수


모델에서 데이터를 지우는 동작을 생각해보는 건 중요함.
 실제 DOM과 연관된 요소를 지우는 것이 아님.
 angular는 MVC 프레임워크로 양방향 바인딩과 콜백없이 모든걸 처리함.

```js
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

// html
<div ng-app="myApp">
    <div class="inbox" ng-controller="EmailsCtrl">
        My Inbox:
        <ul>
            <li ng-repeat="message in emails.messages">
                <p>From: {{ message.from }}</p>
                <p>Subject: {{ message.subject }}</p>
                <p>{{ message.sent | date:'MMM d, y h:mm:ss a' }}</p>
                <a ng-click="deleteEmail($index)">Delete email</a>
            </li>
        </ul>
    </div>
</div>
```

ng-click 디렉티브를 사용했고,
 내부에 클릭 핸들러를 정의하는 것과 여러 가지에서 다름.
 $index를 매개변수로 넘기고, 이것은 angular가 어떤 메일을 지워야 하는지 알려주기 위함.
 

# 선언적 DOM 메서드


디렉티브이며 보통 스크립트 로직으로 작성해서 DOM에 기능을 제공하는 형태.
 간단한 토글 네비게이션을 생각해보면 됨.
 아래의 방법으로(MVVM) toggle을 시킬 수 있고 클릭할 때마다 toggle의 반대값을 할당하여 스위칭 함.

```js
// MVVM controller 없음.
<a href="" ng-click="toggle = !toggle">Toggle nav</a>
  <ul ng-show="toggle">
    <li>Link 1</li>
    <li>Link 2</li>
    <li>Link 3</li>
</ul>
```


# 표현식


angular를 사용하면 js로 따로 코드를 작성하지 않아도 충분히 구현할 수 있음.
 이렇게 작성하면 콜백없이도 애플리케이션에서 데이터를 풀링하거나 읽어온 뒤 자신을 동적으로 갱신함.
 데이터에 상관없이 결과를 알려줌.

```js
// js 코드
elem.onclick = function (data) {
  if (data.length === 0) {
    otherElem.innerHTML = 'No data';
  } else {
    otherElem.innerHTML = 'My data';
  }
};

// angular 코드
<p>{{ data.length > 0 && 'My data' || 'No data' }}</p>
```


# 동적 뷰와 라우팅


SPA 또는 웹사이트는 헤더, 푸터, 사이드바, 본문 등이 있고 URL에 따라 내용이 표시되는 게 보통임.
 angular를 사용하면 동적 뷰를 통해서 이를 쉽게 설정가능.
 URL을 기준으로 $routeProvider를 통해 특정 뷰를 얻어온 다음 적용하면 된다.
 
```js
myApp.config(['$routeProvider', function ($routeProvider) {

  /**
   * $routeProvider
   */
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html'
  })
  // 다른 URL에 대해서 뷰를 추가하는 방법.
  .when('/emails', {
      templateUrl: 'views/emails.html'
  })
  .otherwise({
    redirectTo: '/'
  });

}]);
```

URL이 '/'(사이트의 루트)면 main.html이 주입됨.
 index.html 페이지는 이미 단일 페이지 셋업에 사용했기 때문에 초기 뷰로는 index보다는 main이 좋을 수 있음.
 Ajax 호출이 진행 중일 때 이벤트를 보내는 $http 인터셉터 같은 것도 있음.(중간에 로딩용 등...)
 
 
# 전역 static 데이터


페이저에 데이터를 즉시 반영할 수 있고, 렌더링 속도도 빨라질 수 있음.
 다음은 페이지에 JSON을 작성해서 컨트롤러에 넣고 즉시 바인딩하는 방법.
 
```js
// html
<!-- index.html 내용 (물론 페이지 맨 아래) -->
<script>
window.globalData = {};
globalData.emails = <javaTagHereToGenerateMessages>;
</script>

myApp.controller('EmailsCtrl', ['$scope', function ($scope) {

    $scope.emails = {};
    
    // 초기 데이터를 설정!
    $scope.emails.messages = globalData.emails;
    
}]);
```

페이지가 해석되는 동안 자바 태그가 데이터를 렌더링할 것이고 angular는 이메일 목록을 즉시 렌더링 할 것임.
 

# 압축


함수 앞에 배열에 주입해야 하는 의존관계만 잘 정의하면 압축하기 쉬움.

```js
// 압축 전
myApp.controller('MainCtrl',
['$scope', 'Dependency', 'Service', 'Factory',
function ($scope, Dependency, Service, Factory) {

  // 코드

}]);

// 압축 후
myApp.controller('MainCtrl',
['$scope', 'Dependency', 'Service', 'Factory',
function (a,b,c,d) {

  // a = $scope
  // b = Dependency
  // c = Service
  // d = Factory

  // $scope 별칭이 사용됨
  a.someFunction = function () {...};

}]);
```

주입하는 의존 객체의 순서에 주의해야 함.


# MVC와 MVVM의 차이점


* MVC : 컨트롤러와 통신한다. 모델 - 뷰 - 컨트롤러
* MVVM : 기술적으로는 자기 자신과 통신하는 선언적 데이터 바인딩. 모델 - 뷰 - 뷰 - 모델.
 모델은 뷰와 통신하고 뷰는 모델과 통신함.
 컨트롤러 없이 로직을 작성할 수 있음.
 
컨트롤러가 없어도 ng-repeat를 생성하는 예제.

```js
// 가능하지만 컨트롤러를 사용하는 것을 추천.
<li ng-repeat="number in [1,2,3,4,5,6,7,8,9]">
  {{ number }}
</li>
```


# HTML5 웹 컴포넌트


angular에서도 사용자 정의 요소를 만들 수 있음.(ex) <myPink></myPink>)
 HTML5의 미래를 웹에 구현한 것이고, angular를 사용하면 HTML5의 웹 컴포넌트와 *<template>* 요소를
 비슷하게 사용할 수 있음.
 웹 컴포넌트는 뷰를 생성하기 위한 동적 JS를 주입할 수 있는 사용자 정의 요소로 구성됨.
 
 
# 스코프 주석


일반 html 주석과 비교를 하면...

```js
// html
<!-- header -->
<header>
  Stuff.
</header>
<!-- /header -->

// js
<!-- scope: MainCtrl -->
<div class="content" ng-controller="MainCtrl">

</div>
<!-- /scope: MainCtrl -->
```

angular에선 DOM 대신에 뷰와 스코프를 생각하면 좋다.
 고의로 컨트롤러간의 데이터를 공유하지 않는 한 스코프는 사실 말 그대로인 닫힌 범위라서
 다른 곳에서는 데이터를 접근할 수 없다.
 따라서 한 스코프의 영역을 스코프 주석으로 구분하는 게 도움이 됨.


# 디버깅


구글이 추천하는 크롬 확장 기능을 사용.
 이름은 batarang
 주소 : https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk


















































