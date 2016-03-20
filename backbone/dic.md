
http://www.slideshare.net/gyutaejo/backbonejs-m-v

http://dogfeet.github.io/articles/2012/backbonejs-by-example.html

# MVC란?

* 모델은 애플리케이션이 다루는 영역의 정보를 표현.
	이것을 모델링할 수 있는 데이터의 '종류'로 생각하라.
	모델은 그 상태를 관찰하고 있는 누군가(ex) 뷰)에게 현재 상태를 알려주어야 한다.
* 뷰는 보통은 애플리케이션에서(마크업이나 템플릿과 같은) 사용자 인터페이스로 생각되지만 반드시 그렇지만은 않음.
	뷰는 모델을 감시하기 위해서 모델의 존재를 알아야만 하지만 직접적으로 연계하지는 않는다.

# 기본

* Backbone은 Events, Router, History, View, Model, Collection, Sync
정도로 크게 분류가능.
Events에서 이벤트를 관리하기 때문에 MV만 있는 Backbone에서 
ViewModel이나 Controller를 만들기 위해 사용됨.
Router, History는 SPA를 위한 것이고,
Sync는 서버와의 통신과 동기화를 담당.



## backbone.model

1. 개별 단위의 Data 집합체로서 가장 중요한 역할.
1. Collection에 의해 생성된 한 개의 Model은 View와 서로 참조 연결하여 사용하면 효과적.
1. 각 Model은 CRUD를 위한 고유의 URL을 가짐.(기본값 : collection.url/model.id)


```html
<div ng-app="myApp">
    text
</div>
```

```js
var myApp = angular.module('myApp', []);
```

## backbone.collection

collection은 model을 정렬된 집합으로 관리할 수 있게 도와주는 container.
add, remove 이벤트가 있고 listener를 등록가능.(일반적인 .bind())

```js
var Document = Backbone.Collection.extend({ model: Shape });

var document = new Document();

document.bind('add', function(model) { alert('added'); });
document.bind('remove', function(model) { alert('removed'); });

document.add(shape); // fires add event
document.remove(shape); // fires remove event
```


## Backbone.view

backbone.js에서 view는 model과 함께 사용함(따지고 보면 model과 view가 전체 틀이니...).
view가 화면을 컨트롤하고(controller), render까지 함.(view)
어떻게 하느냐에 따라서 다르겠지만, model-view를 서로 사용하여 화면을 컨트롤하는게 보통.

ex)
```js
var ShapeView = Backbone.View.extend({
    initialize: function() {
        this.model.bind('change', this.updateView, this);
    },
    render: function() {
        $('#page').append(this.el);
        $(this.el)
            .html('<div class="shape"/>'
                  + '<div class="control delete hide"/>'
                  + '<div class="control change-color hide"/>'
                  + '<div class="control resize hide"/>')
            .css({ position: 'absolute', padding: '10px' });
        this.updateView();
        return this;
    },
    updateView: function() {
        $(this.el).css({
            left:       this.model.get('x'),
            top:        this.model.get('y'),
            width:      this.model.get('width') - 10,
            height:     this.model.get('height') - 10 });
        this.$('.shape').css({ background: this.model.get('color') });
    },
    events: {
        'mousemove'               : 'mousemove',
        'mouseup'                 : 'mouseup',
        'mouseenter .shape'       : 'hoveringStart',
        'mouseleave'              : 'hoveringEnd',
        'mousedown .shape'        : 'draggingStart',
        'mousedown .resize'       : 'resizingStart',
        'mousedown .change-color' : 'changeColor',
        'mousedown .delete'       : 'deleting',
    },
    hoveringStart: function () {
        this.$('.control').removeClass('hide');
    },
    hoveringEnd: function () {
        this.$('.control').addClass('hide');
    },
    draggingStart: function (e) {
        this.dragging = true;
        this.initialX = e.pageX - this.model.get('x');
        this.initialY = e.pageY - this.model.get('y');
        return false; // prevents default behavior
    },
    resizingStart: function() {
        this.resizing = true;
        return false; // prevents default behavior
    },
    changeColor: function() {
        this.model.set({ color: prompt('Enter color value', this.model.get('color')) });
    },
    deleting: function() {
        this.remove();
    },
    mouseup: function () {
        this.dragging = this.resizing = false;
    },
    mousemove: function(e) {
        if (this.dragging) {
            this.model.setTopLeft(e.pageX - this.initialX, e.pageY - this.initialY);
        } else if (this.resizing) {
            this.model.setDim(e.pageX - this.model.get('x'), e.pageY - this.model.get('y'));
        }
    }
});

var DocumentView =  Backbone.View.extend({
    id: 'page',
    views: {},
    initialize: function() {
        this.collection.bind('add', this.added, this);
        this.collection.bind('remove', this.removed, this);
    },
    render: function() {
        return this;
    },
    added: function(m) {
        this.views[m.cid] = new ShapeView({
            model: m,
            id:'view_' + m.cid
        }).render();
    },
    removed: function(m) {
        this.views[m.cid].remove();
        delete this.views[m.cid];
    }
});
```

* initialize는 View가 생성될 때 실행되는 함수.
기본으로 실행하는 부분.

* render는 View를 초기화하고 나서 실행함(당연히 init이 아니므로 직접 .render()처럼 실행)
여기서 render의 의미대로, View에 필요한 html 요소들을 초기화하고 DOM에 추가한다.
(react에 엮으려면... 여기서 ReactDOM.render()를 사용할 것 같음).

* View에서 사용한 .el은 View에서 상속받은 것.

* View에서 events 해시는 중요함.
이 부분에서 이벤트와 리스너를 연결하며 { 'event selector': 'handler' } 형식으로 정의한다. 
ex) { 'mousedown .shape': 'draggingStart' } .shape 클래스를 가진 요소에 mousedown시 draggingStart 실행.

* DocumentView처럼 View내부의 id 프로퍼티는 View에 묶인 DOM의 id임.
이 값으로 DOM을 찾아서 .el 프로퍼티를 찾음.
문서를 찾아보니 `tagName`, `className`, `id`, `attributes` 프로퍼티를 사용하면 .el이 지정됨.
지정하지 않으면 빈 div가 지정됨.

* initialize 메소드에서 Collection View의 add, remove를 등록함.



그럼 뭘 만들어볼까나..
















































