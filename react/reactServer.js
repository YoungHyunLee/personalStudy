var express = require('express')
  , multer = require('multer')
  , upload = multer({ dest : './uploads/'})
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , mongo = require("mongoskin")
  , path = require('path')
  , fs = require('fs')
  , bodyParser = require('body-parser');

//var port = process.env.PORT ||80;
//var mongoUrl = process.env.MONGOHQ_URL || "127.0.0.1:27017/data";

// mongoDB native 버젼.
var mongoose = require('mongoose');
mongoose.connect('mongodb://numberTest:test@ds019829.mlab.com:19829/reactdb'); // 포트번호(27017) 생략가능
// var connection1 = mongoose.createConnection('mongodb://localhost/mydatabase'); 여러 개의 db에 연결할 때 사용.

// mongodb 설정 부분.
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
var db = mongoose.connection,
	peopleModel = null;
	
// 첫 연결했을 때.
db.once('open', function(){
	console.log("db 연결!!")
	// 개인정보 스키마 생성
	var userInfoSchema = new Schema({
		first_name: String, last_name: String, company_name: String,
		address: String, city: String, county: String,
		state: String, zip: String, phone1: String, phone2: String,
		email: String, web: String
	})
	
	// 그 스키마를 가진 모델 생성
	var UserInfo = mongoose.model('people', userInfoSchema);
	global.peopleModel = peopleModel = UserInfo;
	/*
	// 개인정보 스키마 생성
	var userInfoSchema = new Schema({
		first_name: String, last_name: String, company_name: String,
		address: String, city: String, county: String,
		state: String, zip: String, phone1: String, phone2: String,
		email: String, web: String
	})
	
	// 그 스키마를 가진 모델 생성
	var UserInfo = mongoose.model('people', userInfoSchema);
	global.userInfoModel = userInfoModel = UserInfo;
	
	var userSave = new UserInfo({ 
		first_name: "James", last_name: "Butt", company_name: "Benton, John B Jr",
		address: "6649 N Blue Gum St", city: "New Orleans", county: "Orleans",
		state: "LA", zip: "70116", phone1: "504-621-8927", phone2: "504-845-1427",
		email: "jbutt@gmail.com", web: "http://www.bentonjohnbjr.com" })
	userSave.save()
	*/
	peopleModel.find({first_name : 1}, function(err, isValue){
		
	})
	
});


// express 설정
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // DOM에 접근하기 위한 코드.
app.use(bodyParser.urlencoded({extended : false}));

// 파일 업로드 & 다운로드
/*
var fileAdmin = require('./serverModule/fileAdmin.js');
app.post('/upload', upload.single('myfile'), fileAdmin.uploadFile);
app.post('/download', upload.single('myfile'), fileAdmin.downloadFile);
*/

// 첫 페이지 로딩.
app.get('/', function (req, res) {	
	fs.readfile(__dirname + '/index.html', function (error, data) {
		res.writeHead(200, {'Content-Type' : 'test/html'});
		res.end(data, function(error){
			console.log(error)
		})
	});
});


// 서버 시작.
server.listen(process.env.PORT ||80);


// 파일 업로드 & 다운로드
//var socketAdmin = require('./serverModule/socketAdmin.js');

// 소켓 통신 정의
//global.io = io;
io.sockets.on('connection', function(socket){
	// 초기 설정.	
	socket.on('init', function (data) {
		socket.rooms = [];
    });	
	/*
		회원가입 페이지	 
		signUp email에서 저장버튼을 누른 후, 데이터를 받음.
	 */
	socket.on('signUp_email', function(data){
		socketAdmin.signUpEmail(data, socket)
	});
	
	// 접속이 종료되면 trigger
  	socket.on('disconnect', function () {
  		console.log('접속 종료 메서드 실행!!!.', socket.rooms);
  		if(socket.rooms === undefined) return false;
  		for(var i = 0, list = socket.rooms, len = list.length; i < len ; i +=1){
  			socket.leave(list[i].roomname);
  			console.log("접종!! ", socket.rooms.roomname, socket.rooms.socketIds)
  		}
  		
  		io.sockets.emit('user disconnected');
  		/*
	  	그냥 대충 roomid 만들었던 때에 사용했음.	
  		socket.leave(roomId);
		io.sockets.emit('user disconnected');
		
		var ind = clients[0]['_'+socket.id] + 1;
		clients.splice( ind ,1);
		*/
 	});
 	
 	
 	
});



























