
# 참고 

http://reactkr.github.io/react/docs/getting-started-ko-KR.html

http://www.itdaily.kr/news/articleView.html?idxno=56974

# react 기본.

* jsx는 js내에서 xml을 사용할 수 있도록 하는 것으로,
	JSXTransformer_0_13_1등을 사용하면 작성할 수 있음.
	react는 이 jsx 문법을 기본으로 작성함.
	하지는 오프라인에서 (npm install -g react-tools) js파일로 변환할 수 있음.

```cmd
npm install -g react-tools
jsx --watch src/build/

// 수정할 때마다 build/file.js 파일이 자동생성됨.
```

* jsx 컴파일러가 자동으로 HTML 태그들을(jsx 문법으로 .js 파일에서 사용한) `React.createElement(tagName)`
	표현식으로 재작성하고 나머지는 그대로 두기 때문에, 전역 NS가 오염되지 않음.

* React는 카멜케이스 네이밍 컨벤션을 사용함.


# 버전관련

* React.render, React.findDOMNode처럼 DOM관련 React 메소드는
ReactDOM.render, ReactDOM.findDOMNode 처럼 사용하고, 
react-dom 라이브러리를 사용해야 함.


## react 튜토리얼 - http://reactkr.github.io/react/docs/tutorial-ko-KR.html


### 기본

ex)
```js
// tutorial1.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('content')
);

// tutorial1-raw.js
var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: "commentBox"},
        "Hello, world! I am a CommentBox."
      )
    );
  }
});
React.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);
```

* 새로운 React 컴포넌트를 만들기 위해 `React.createClass()`로 JavaScript 객체에 몇 개의 메소드를 담아 넘김.
	가장 중요한 것은 `render`메소드인데, 이는 React 컴포넌트 트리를 리턴해서 최종적으로 HTML을 그림.

* `<div>` 태그들은 실제 DOM 노드가 아니라 React `div` 컴포넌트 인스턴스.
	이것은 React가 다룰 수 있는 데이터의 표시자(markers)나 조각이라 생각할 수 있음.
	생(raw) HTML 문자열을 생성하는 것이 아니기 때문에 XSS(크로스 사이트 스크립트 취약점)를 기본적으로 방지함.

* 일반적인 HTML만 리턴하는 것이 아닌, 만들어진 컴포넌트의 트리를 리턴할 수도 있음.
	이것이 React를 조합가능(composable)하게 만들며, 유지보수 가능한 프론트앤드를 위한 핵심 교리(key tenet).

* `React.render()`는 최상위 컴포넌트의 인스턴스를 만들고, 두 번째 인수로 전달받은 DOM 엘리먼트에 
	마크업을 삽입해 프레임워크를 시작함.
	

### props 사용

ex)
```js
// tutorial4.js
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});
```

부모 컴포넌트로부터 받은 데이터는 자식 컴포넌트에서 '프로퍼티'로 사용가능함.
프로퍼티들은 `this.props`를 통해 접근할 수 있음.
jsx 내부의 중괄호로 둘러싸인 js 표현식을 통해 React 컴포넌트를 트리에 더할 수 있음.


### 컴포넌트 프로퍼티(Component Properties)

ex)
```js
// tutorial5.js
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">댓글입니다</Comment>
        <Comment author="Jordan Walke">*또 다른* 댓글입니다</Comment>
      </div>
    );
  }
});
```

위에서 `Comment` 컴포넌트를 만들었으니, 여기에 글쓴이와 내용을 넘길 수 있고,
이렇게 함으로써 각 고유한 comment에서 같은 코드를 재사용할 수 있음.

부모 컴포넌트인 `CommentList`에서 자식 컴포넌트인`Comment`에 데이터들을 전달하고 있다.
예컨대, 어트리뷰트로 *Pete Hunt*를, XML 형식의 자식 노드로 *댓글입니다*를 첫 번째 `Comment`로 넘김.

* `Comment` 컴포넌트는 '프로퍼티'를 `this.props.author`, `this.props.children`를 통해 접근할 수 있음.


### Markdown 추가하기.

ex)
```js
// tutorial6.js
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {marked(this.props.children.toString())}
      </div>
    );
  }
});
```

Markdown은 텍스트를 포맷팅하는 간단한 방식임.
예컨대, 별표(`*`)로 텍스트를 둘러싸는 것은 강조의 의미.
서드파티 라이브러리인 marked를 애플이케이션에 추가하면 사용할 수 있음.(그냥 js 라이브러이를 로드하라는 뜻)

* 그냥 .md 파일의 문법을 말하는 것 같음.

marked가 `this.props.children`에서 텍스트를 읽어들여 처리할 수 있도록 React 형식의 텍스트(React's wrapped text)를
단순 텍스트(raw string)으로 전환하기 위해 명시적으로 `toString()`을 호출함.

위처럼 사용하면 HTML 태그들이 정상적으로 렌더되지 않고(toString()를 바로 사용했으니 태그도 문자열로..)
문자열로 표현된다.
이렇게 XSS 공격을 예방하며, 우회할 방법은 있지만 프레임워크는 사용하지 않도록 경고하고 있음.
참조 : http://reactkr.github.io/react/docs/tutorial-ko-KR.html - markdown 

### 데이터 모델 연결하기.

ex)
```js
var data = [
  {author: "Pete Hunt", text: "댓글입니다"},
  {author: "Jordan Walke", text: "*또 다른* 댓글입니다"}
];

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>댓글</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
```

데이터를 모듈화된 방식으로 `CommentList`에 넣어야 함.
props를 이용해 데이터를 넘기도록 `CommentBox`와 `React.render()` 호출 코드를 수정함.

댓글이 동적으로 렌더함.

* array.map : 배열의 각 요소에 대해서 정의된 콜백 함수를 호출하고 결과가 포함되어 있는 배열을 반환.

* 0.14.7 버전에서는 `CommentList`에서 render 메소드에 사용된 
`<Comment author={comment.author} key={comment.id}>` 이 부분처럼 
배열 안의 각 요소들 아니면 식별자들은 유니크한 `key` prop를 가져야만 하므로,
위처럼 추가해야 한다. 참조 : https://fb.me/react-warning-keys 


### 서버에서 가져오기(Fetching)

```js
// tutorial11.js
React.render(
  <CommentBox url="comments.json" />,
  document.getElementById('content')
);
```

데이터를 소스에 직접 넣지 않고, 동적으로 받아서 처리하는 방식으로 바꿀 수 있음.
앞에서 했던 `data={data}`대신에 URL로 작성.

이 컴포넌트는 이전 것과 다르게, 스스로 다시 렌더링해야 함.
컴포넌트는 서버에서 요청이 들어올 때까지 아무 데이터도 가지고 있지 않다가, 
특정한 시점에서 새로운 댓글을 렌더링할 필요가 있음.

* 현재 server.js 파일에서(서버가 node이기에..) /api/comments 요청이 일어나면
comments.json을 로드해서 보내주므로, 실제 파일에서는 url을 작성함.

### 반응적 State

ex)
```js
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>댓글</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
```

지금까지, 각각의 컴포넌트는 props를 기반으로 한번 렌더되었음.
`props`는 불변성을 가지며, 그것들은 부모에서 전달되어 부모에게 '소유'되어 있음.
컴포넌트에 상호작용을 구현하기 위해, 가변성을 갖는 state를 사용함.

`this.state`는 컴포넌트에 한정(private)되며 `this.setState()`를 통해 변경할 수 있음.
state가 업데이트가 되면, 컴포넌트는 자신을 스스로 다시 렌더링함.

`render()` 메소드는 `this.props`와 `this.state`를 위한 함수로 선언적으로 작성된다.
프레임워크에서 입력값에 따른 UI가 항상 일관성 있음을 보장해줌.

서버가 데이터를 가져오면 댓글 데이터가 변경됨.
댓글 데이터의 배열을 `CommentBox`의 state로 추가했음.

`getInitialState()`는 컴포넌트의 생명주기동안 한 번만 실행되며 컴포넌트의 초기 state를 설정.


### state 업데이트하기.

ex)
```js
// tutorial13.json
[
  {"author": "Pete Hunt", "text": "댓글입니다"},
  {"author": "Jordan Walke", "text": "*또 다른* 댓글입니다"}
]

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>댓글</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);
```

컴포넌트의 최초 생성 시에, 서버에서 GET 방식으로 넘겨받아 최신의 데이터가 state에 반영되길 원했음.
실제 애플리케이션에선 이것이 동적인 엔드포인트이지만, 
이 예제에서는 정적 JSON 파일을 사용함.

`componentDidMount`는 컴포넌트가 렌더링 된 다음 React에 의해 자동으로 호출되는 메소드.
동적 업데이트의 핵심은 `this.setState()`의 호출임.

이전의 댓글 목록을 서버에서 넘어온 새로운 목록으로 변경하면 자동으로 UI가 업데이트 된다.
이 반응성 덕분에 실시간 업데이트에 아주 작은 수정만 가해진다.
여기선 간단한 폴링을 사용할 것이지만 웹소켓등의 다른 기술도 쉽게 사용할 수 있음.

`this.props.pollInterval`값에 의해서 2초마다 반복됨.


### 새로운 댓글 추가하기

ex)
```js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    // TODO: 서버에 요청을 수행하고 목록을 업데이트한다
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>댓글</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    // TODO: 서버에 요청을 전송합니다
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="이름" ref="author" />
        <input type="text" placeholder="내용을 입력하세요..." ref="text" />
        <input type="submit" value="올리기" />
      </form>
    );
  }
});
```

`CommentForm` 컴포넌트는 사용자에게 이름과 내용을 입력받고 댓글을 저장하기 위해 서버에 요청을 전송해야 함.

사용자가 폼을 전송하는 시점에 
1. 폼을 초기화하고 
1. 서버에 요청을 전송하고
1. 댓글목록을 업데이트해야 함.

* 이벤트 : React는 카멜케이스 네이밍 컨벤션으로 컴포넌트에 이벤트 핸들러를 등록함.
폼이 유효한 값으로 submit되었을 때 폼필드들을 초기화하도록 `onSubmit` 핸들러를 등록.
submit에 대한 브라우저 기본 동작을 막아야 하기에 `preventDefault()`를 호출.

* Refs : 자식 컴포넌트의 이름을 지정하기 위해 `ref` 어트리뷰트를,
컴포넌트를 참조하기 위해 `this.refs`를 사용함.
고유한(native) 브라우저 DOM 엘리먼트를 얻기 위해
`React.findDOMNode(component)`를 호출할 수 있음.

* props로 콜백 처리 : 사용자가 댓글을 등록할 때, 새로운 댓글을 추가하기 위해 댓글목록을 업데이트를 해야 함.
`CommentBox`가 댓글목록의 state를 소유하고 있기 때문에 이 로직 또한 `CommentBox`에 있는 것이 타당함.

이렇게 하기 위해서는 자식 컴포넌트가 그의 부모에게 데이터를 넘겨줄 필요가 있음.
부모의 `render` 메소드에서 새로운 콜백(`handleCommentSubmit`)을 자식에게 넘겨주고,
자식의 `onCommentSubmit` 이벤트에 그것을 바인딩해주는 식으로 구현함.


### 최적화: 낙관적 업데이트

ex)
```js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>댓글</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
```

기본적인 기능은 갖추었지만, 댓글이 목록에 업데이트 되기 전에 완료요청을 기다리는 게 조금 느림(폴링이 2초).
낙관적 업데이트를 통해 댓글이 목록에 추가되도록 함으로써 앱이 좀 더 빨라진 것처럼 느껴지도록 할 수 있음.

* 낙관적 업데이트는 소스코드를 봤을 때,
업데이트는 잘 될 것으로 가정하기 때문에(어찌보면 당연히 잘 돼야...), 
본인 페이지에 바로 보이게 처리하여 체감상 더 빠르도록 처리하는 것을 말하는 느낌..
결론은 어차피 업뎃될꺼니까 바로 보이게 처리.(내가 myChat에서 했던 기법)


## 리엑트로 생각해보기 - http://reactkr.github.io/react/docs/thinking-in-react-ko-KR.html


### 1단계 : UI를 계층 구조의 컴포넌트로 분쇄하라.

ex)
```js
// json 객체
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]
```

이상적으로 하나의 컴포넌트는 한 가지 작업만 수행해야 한다.
컴포넌트가 커진다면 작은 자식 컴포넌트로 쪼개져야 한다.

주로 JSON 데이터 모델을 사용자에게 보여주기 때문에,
자료 모델이 잘 설계되었다면 UI(혹은 컴포넌트 구조)가 잘 맞아 떨어진다.


### 2단계 : 정적 버전을 만드세요.


이 자료를 기반으로 소스를 작성하면

```js
var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  render: function() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
});


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

큰 프로그램은 역시 큰 단위에서 작은 단위로(마치 퍼블리싱 하듯이) 하는게..
편하기는 하다.


### 3단계 : UI state의 표현을 작지만 완전하도록 확인하세요.


상호적인 UI를 만들기 위해서는 자료 모델 변화에 반응할 수 있어야 한다.
React는 state로 쉽게 만들 수 있음.

올바른 사용법은
1. 애플리케이션에 필요한 변할 수 있는 state 들의 최소한의 집합에 대해서 생각해볼 필요가 있다.
스스로 반복하지 않는게 첫 번째 방법.
애플리케이션의 상태를 나타낼 수 있는 가장 최소한의 표현 방식을 찾고,
그 밖의 것은 필요할 때 계산한다.

ex) TODO 목록을 만든다고 했을 때,
TODO 아이템들의 배열만 유지하고, 개수를 표현하기 위한 state 변수를 분리하지 말아야 함.
대신 TODO 아이템들 배열의 길이를 이용하라.

예제에서는 
* product 들의 원본 목록
* 사용자가 입력한 검색어
* 체크박스의 값.
* product 들의 필터된 목록
이런 유형이 있고, 어느 것이 state가 될지 따져봐야 함.

아래 3가지에 대해서 생각해보면..
1. 만약 부모로부터 props 를 이용해 전달됩니까? 그렇다면 이건 state가 아닙니다.
1. 종종 바뀝니까? 아니라면 이것 역시 state가 아닙니다.
1. 컴포넌트에 있는 다른 state나 props를 통해서 계산되어질 수 있습니까? 역시 state가 아닙니다.

그냥 가변적인 것이긴 한데... 복잡하게 생각하면 한없이 복잡함.
검색어와 체크박스의 값은 다른 것에 의해 계산될 수 있는 값이 아니고 시시각각 변하기 때문에 state임.


### 4단계: 어디서 state가 유지되어야 하는지 확인하세요.


ex)
```js
var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText} />
        <p>
          <input type="checkbox" checked={this.props.inStockOnly} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },

  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
});


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
```

감이 왔으니.. 정리는 여기까지.



































