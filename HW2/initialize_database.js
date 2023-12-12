const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Tarot';
const db = client.db(dbName);
const collection = db.collection('Cards');

async function connect() {
  const curTime = new Date().toLocaleString();
  try {
    await client.connect();
    console.log('Connected to MongoDB : '+ curTime);
    // 연결 성공 시 수행할 작업
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

async function close() {
  await client.close();
  console.log('Disconnected from MongoDB');
}


async function insertData(doc) {
  await collection.insertMany(doc);
  close();
}


const documents = [
  { number: 0, name: 'The Fool', korean: '바보, 광대', meaning: '모험, 무지(無知)'},
  { number: 1, name: 'The Magician', korean: '마술사, 마법사, 기술사', meaning: '창조, 수완'},
  { number: 2, name: 'The High Priestess', korean: '고위 여사제, 여사제장, 여법황', meaning: '지식, 총명'},
  { number: 3, name: 'The Empress', korean: '여제, 여황제', meaning: '풍양, 모성'},
  { number: 4, name: 'The Emperor', korean: '황제', meaning: '책임, 부성(父性)'},
  { number: 5, name: 'The Hierophant', korean: '교황, 법황, 사제장', meaning: '가르침, 관대함'},
  { number: 6, name: 'The Lovers', korean: '연인, 연애', meaning: '연애, 쾌락'},
  { number: 7, name: 'The Chariot', korean: '전차, 정복자', meaning: '전진, 승리'},
  { number: 8, name: 'Strength', korean: '힘, 기백, 강의, 역량, 의지', meaning: '힘, 용기'},
  { number: 9, name: 'The Hermit', korean: '은둔자', meaning: '탐색, 사려깊음'},
  { number: 10, name: 'Wheel of Fortune', korean: '운명의 수레바퀴, 운명', meaning: '기회, 일시적인 행운'},
  { number: 11, name: 'Justice', korean: '정의, 재판의 여신', meaning: '균형, 정당함'},
  { number: 12, name: 'The Hanged Man', korean: '매달린 남자, 사형수, 형사자', meaning: '자기희생, 인내'},
  { number: 13, name: 'Death', korean: '죽음, 사신', meaning: '격변, 이별'},
  { number: 14, name: 'Temperance', korean: '절제', meaning: '조화, 견실'},
  { number: 15, name: 'The Devil', korean: '악마', meaning: '사심, 속박, 타락'},
  { number: 16, name: 'The Tower', korean: '탑', meaning: '파괴, 파멸'},
  { number: 17, name: 'The Star', korean: '별', meaning: '희망, 동경'},
  { number: 18, name: 'The Moon', korean: '달', meaning: '불안, 애매함, 혼돈'},
  { number: 19, name: 'The Sun', korean: '태양', meaning: '밝은 미래, 만족'},
  { number: 20, name: 'Judgement', korean: '심판, 영겁', meaning: '부활, 개선'},
  { number: 21, name: 'The World', korean: '세계, 우주', meaning: '완성, 완전'},
  { number: 22, name: 'Wands#01', korean: '막대기#01', meaning: '창조력, 출발'},
  { number: 23, name: 'Wands#02', korean: '막대기#02', meaning: '재산, 장엄함'},
  { number: 24, name: 'Wands#03', korean: '막대기#03', meaning: '확립된 힘, 교역'},
  { number: 25, name: 'Wands#04', korean: '막대기#04', meaning: '작업의 완성, 휴식'},
  { number: 26, name: 'Wands#05', korean: '막대기#05', meaning: '치열한 경쟁, 스포츠'},
  { number: 27, name: 'Wands#06', korean: '막대기#06', meaning: '승리자, 대뉴스의 도달'},
  { number: 28, name: 'Wands#07', korean: '막대기#07', meaning: '용기, 토론'},
  { number: 29, name: 'Wands#08', korean: '막대기#08', meaning: '활동성, 재빠름'},
  { number: 30, name: 'Wands#09', korean: '막대기#09', meaning: '억압된 상황에서의 강함'},
  { number: 31, name: 'Wands#10', korean: '막대기#10', meaning: '억압, 너무 많은 재산'},
  { number: 32, name: 'Wands#Page', korean: '막대기#페이지', meaning: '젊은 남성, 충실'},
  { number: 33, name: 'Wands#Knight', korean: '막대기#나이트', meaning: '출발, 친숙한 젊은이'},
  { number: 34, name: 'Wands#Queen', korean: '막대기#퀸', meaning: '친숙한, 정적'},
  { number: 35, name: 'Wands#King', korean: '막대기#킹', meaning: '정직, 양심적'},
  { number: 36, name: 'Cups#01', korean: '성배#01', meaning: '기쁨, 만족'},
  { number: 37, name: 'Cups#02', korean: '성배#02', meaning: '사랑, 우정'},
  { number: 38, name: 'Cups#03', korean: '성배#03', meaning: '풍족함, 행복,'},
  { number: 39, name: 'Cups#04', korean: '성배#04', meaning: '권태, 포식'},
  { number: 40, name: 'Cups#05', korean: '성배#05', meaning: '손실, 별거 아닌 유산'},
  { number: 41, name: 'Cups#06', korean: '성배#06', meaning: '과거를 돌이켜봄, 행복'},
  { number: 42, name: 'Cups#07', korean: '성배#07', meaning: '환상, 약간의 성공(영구적이진 않음)'},
  { number: 43, name: 'Cups#08', korean: '성배#08', meaning: '성공의 방치, 겸손'},
  { number: 44, name: 'Cups#09', korean: '성배#09', meaning: '물질적 안녕, 만족'},
  { number: 45, name: 'Cups#10', korean: '성배#10', meaning: '만족, 가정'},
  { number: 46, name: 'Cups#Page', korean: '성배#페이지', meaning: '공부에 힘쓰는 젊은이, 숙고'},
  { number: 47, name: 'Cups#Knight', korean: '성배#나이트', meaning: '도착, 발전'},
  { number: 48, name: 'Cups#Queen', korean: '성배#퀸', meaning: '선량한, 행복'},
  { number: 49, name: 'Cups#King', korean: '성배#킹', meaning: '공정한, 창조적 지성'},
  { number: 50, name: 'Swords#01', korean: '검#01', meaning: '힘의 승리, 권력'},
  { number: 51, name: 'Swords#02', korean: '검#02', meaning: '균형, 조건부의 조화'},
  { number: 52, name: 'Swords#03', korean: '검#03', meaning: '후퇴, 단절'},
  { number: 53, name: 'Swords#04', korean: '검#04', meaning: '은둔, 회복'},
  { number: 54, name: 'Swords#05', korean: '검#05', meaning: '타락, 폐지'},
  { number: 55, name: 'Swords#06', korean: '검#06', meaning: '작업을 끝마침, 중개자'},
  { number: 56, name: 'Swords#07', korean: '검#07', meaning: '기획, 계획'},
  { number: 57, name: 'Swords#08', korean: '검#08', meaning: '구속된 힘, 비난'},
  { number: 58, name: 'Swords#09', korean: '검#09', meaning: '실망, 환멸'},
  { number: 59, name: 'Swords#10', korean: '검#10', meaning: '황폐, 고통'},
  { number: 60, name: 'Swords#Page', korean: '검#페이지', meaning: '감시, 경계'},
  { number: 61, name: 'Swords#Knight', korean: '검#나이트', meaning: '용감함, 격노'},
  { number: 62, name: 'Swords#Queen', korean: '검#퀸', meaning: '결단력 있는, 미망인'},
  { number: 63, name: 'Swords#King', korean: '검#킹', meaning: '재판관, 정의'},
  { number: 64, name: 'Pentacles#01', korean: '동전#01', meaning: '완전한 만족, 돈'},
  { number: 65, name: 'Pentacles#02', korean: '동전#02', meaning: '명람함, 문서에 의한 뉴스·메세지'},
  { number: 66, name: 'Pentacles#03', korean: '동전#03', meaning: '기예, 거래'},
  { number: 67, name: 'Pentacles#04', korean: '동전#04', meaning: '소유의 보정, 집착'},
  { number: 68, name: 'Pentacles#05', korean: '동전#05', meaning: '물질적인 트러블'},
  { number: 69, name: 'Pentacles#06', korean: '동전#06', meaning: '성공, 선물'},
  { number: 70, name: 'Pentacles#07', korean: '동전#07', meaning: '금전, 사업'},
  { number: 71, name: 'Pentacles#08', korean: '동전#08', meaning: '장인 기질, 준비'},
  { number: 72, name: 'Pentacles#09', korean: '동전#09', meaning: '물질적인 풍요, 달성'},
  { number: 73, name: 'Pentacles#10', korean: '동전#10', meaning: '이익, 재산'},
  { number: 74, name: 'Pentacles#Page', korean: '동전#페이지', meaning: '정려근면, 학생'},
  { number: 75, name: 'Pentacles#Knight', korean: '동전#나이트', meaning: '유용, 재산'},
  { number: 76, name: 'Pentacles#Queen', korean: '동전#퀸', meaning: '부, 관대'},
  { number: 77, name: 'Pentacles#King', korean: '동전#킹', meaning: '실제적인 지성, 사업'} 
];

console.log("starting..");
connect();
insertData(documents);
console.log("finished");