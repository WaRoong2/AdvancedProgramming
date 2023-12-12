const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
const { log } = require('console');
const grpc = require('grpc');
const { infoManagerClient, TarotPlayerClient } = require('./tarot_back_grpc_pb');
const { idRequest } = require('./tarot_back_pb');
const { loginRequest } = require('./tarot_back_pb');
const { infoData } = require('./tarot_back_pb');
const { chngPwRequest } = require('./tarot_back_pb');
const { cardRequest } = require('./tarot_back_pb');
const { saveRequest } = require('./tarot_back_pb');
const OpenAI = require('openai');

require("dotenv").config();

// gRPC 서버의 엔드포인트
const serverAddress = 'localhost:8080';
// gRPC 클라이언트 생성
const infoClient = new infoManagerClient(serverAddress, grpc.credentials.createInsecure());
const tarotClient = new TarotPlayerClient(serverAddress, grpc.credentials.createInsecure());

const app = express();
const openai = new OpenAI();

// CORS 설정
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 서버를 시작하고 수신 대기
app.listen(50000, function(){
    console.log("Listening Port#50000");
});


// 00. 기본 접속
app.get('/', function(req, res){
    console.log(req.body);
    res.send("Server Running...");
});
  
// 01. 아이디 중복체크 - ChkInfo
app.get('/dup-check', function(req, res){
    if (req.body==null){
      res.send("No Input Data");
      return
    }
    const {id} = req.body;
    console.log(id);
    const request = new idRequest();
    request.setId(id);
    infoClient.chkInfo(request,(error, response) => {
      if (!error) {
        console.log('Server response:', response.array[0]);
        var findResult = response.array[0]
        res.send(findResult);
      } else {
        console.error(error);
        res.send(error);
      }
    });
});

// 02. 회원가입 - SignUp
app.post('/sign-up', async (req, res) => {
  if (req.body==null){
    res.send("No Input Data");
    return
  }
  const { id, pw } = req.body;
  console.log(id, pw);
  const request = new loginRequest();
  request.setId(id);
  request.setPw(pw);
  infoClient.signUp(request,(error, response) => {
    if (!error) {
      console.log('Server response:', response.array[0]);
      var findResult = response.array[0]
      res.send(findResult);
    } else {
      console.error(error);
      res.send(error);
    }
  });
});


// 03. 내 정보 입력/수정 - SetInfo
app.put('/set-info', async (req, res) => {
  if (req.body==null){
    res.send("No Input Data");
    return
  }
  const { id, gender, age, job, relation } = req.body;
  console.log(id, gender, age, job, relation);
  const request = new infoData();
  request.setId(id);
  request.setGender(gender);
  request.setAge(age);
  request.setJob(job);
  request.setRelation(relation);
  infoClient.setInfo(request,(error, response) => {
    if (!error) {
      console.log('Server response:', response.array[0]);
      var findResult = response.array[0]
      res.send(findResult);
    } else {
      console.error(error);
      res.send(error);
    }
  });
});


// 04. 로그인 - LogIn
app.post('/log-in', (req, res) => {
  if (req.body==null){
    res.send("No Input Data");
    return
  }
  const { id, pw } = req.body;
  console.log(id, pw);
  const request = new loginRequest();
  request.setId(id);
  request.setPw(pw);
  infoClient.logIn(request,(error, response) => {
    if (!error) {
      console.log('Server response:', response.array[0]);
      var findResult = response.array[0]
      res.send(findResult);
    } else {
      console.error(error);
      res.send(error);
    }
  });
  }
);

// 05. 비밀번호 변경 - ChngPw
app.patch('/change-pw', (req, res) => {
  if (req.body==null){
    res.send("No Input Data");
    return
  }
  const { id, pw1, pw2 } = req.body;
  console.log(id, pw1, pw2);
  const request = new chngPwRequest();
  request.setId(id);
  request.setPw1(pw1);
  request.setPw2(pw2);
  infoClient.chngPw(request,(error, response) => {
    if (!error) {
      console.log('Server response:', response.array[0]);
      var findResult = response.array[0]
      res.send(findResult);
    } else {
      console.error(error);
      res.send(error);
    }
  });
  }
);

// 06. 일일 타로1(카드 뽑기) - GetCards
app.get('/get-card', async (req, res) => {
    if (req.query==null){
      res.send("No Input Data");
      return
    }
    const { n1, n2, n3 } = req.query;
    console.log(n1, n2, n3);
    const request = new cardRequest();
    request.setN1(n1);
    request.setN2(n2);
    request.setN3(n3);
    tarotClient.getCards(request,(error, response) => {
      if (!error) {
        var cards = response.array;
        for (let i=0; i<3; i++) {
          if (cards[i][0] == -1)
            cards[i][0] = 0;
          if (cards[i][4] == 2)
            cards[i][4] = 0;
        }
        console.log('Server response:', cards);
        res.send(cards);
      } else {
        console.error(error);
        res.send(error);
      }
    });
  }
);
  
// 07. 일일타로2(카드 해석) - SaveTarot
app.post('/read-card', async (req, res) => {
  if (req.body==null){
    res.send("No Input Data");
    return
  }
  try {
    console.log(req.body);
    const { info, card, topic } = req.body;
    var gender = info[1];
    var age = info[2];
    var job = info[3];
    var relation = info[4];
    var c1 = card[0][1];
    var c2 = card[1][1];
    var c3 = card[2][1];
    if (card[0][4] == 1)
      c1 = "reversed " + c1;
    if (card[0][4] == 1)
      c2 = "reversed " + c2;
    if (card[0][4] == 1)
      c3 = "reversed " + c3;
    var chatGPTprompt = `I am ${age} years old ${gender}.
    My current job is ${job}, and I'm ${relation}.
    I want a tarot reading related to ${topic}.
    I drew ${c1}, ${c2}, ${c3} cards.
    What does it mean?
    Please interpret the cards relating them to my situation in korean.
    Don't add some remarks.`;
    console.log(chatGPTprompt);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: chatGPTprompt}],
    });
    console.log(completion.choices[0].message.content);
    const request = new saveRequest();
    request.setId(info[0]);
    request.setContent(completion.choices[0].message.content);
    tarotClient.saveTarot(request,(error, response) => {
      if (!error) {
        console.log('Server response:', response.array[0]);
        res.send(response.array[0]);
      } else {
        console.error(error);
        res.send(error);
      }
    });
  } catch (err) {
    console.error('Error connecting to ChatGPT', err);
    res.send("No Response");
  }
}
);

// 08. 이전 타로 기록 - LoadTarot
app.get('/history', async (req, res) => {
  if (req.query==null){
    res.send("No Input Data");
    return
  }
  const {id} = req.query;
  console.log(id);
  const request = new idRequest();
  request.setId(id);
  tarotClient.loadTarot(request,(error, response) => {
    if (!error) {
      console.log('Server response:', response.array);
      var findResult = response.array
      res.send(findResult);
    } else {
      console.error(error);
      res.send(error);
    }
  });
});


// 09. 내 정보 조회 - GetInfo
app.get('/get-info', async (req, res) => {
  if (req.query==null){
    res.send("No Input Data");
    return
  }
  const {id} = req.query;
  console.log(id);
  const request = new idRequest();
  request.setId(id);
  infoClient.getInfo(request,(error, response) => {
    if (!error) {
      console.log('Server response:', response.array);
      var findResult = response.array;
      res.send(findResult);
    } else {
      console.error(error);
      res.send(error);
    }
  });
});


// 10. 회원 탈퇴 - delAccount
app.delete('/del-account', async (req, res) => {
  if (req.body==null){
    res.send("No Input Data");
    return
  }
  const { id, pw } = req.body;
  console.log(id, pw);
  const request = new loginRequest();
  request.setId(id);
  request.setPw(pw);
  infoClient.delAccount(request,(error, response) => {
    if (!error) {
      console.log('Server response:', response.array[0]);
      var delResult = response.array[0]
      res.send(delResult);
    } else {
      console.error(error);
      res.send(error);
    }
  });
});