const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStringElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// global socket handler
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected!`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username} : ${chat}`);
});

// event callback functions
const handleSubmit = (event) => {
  event.preventDefault(); // submit 하면 버블(새로고침)이 발생 -> 막아주는 매소드
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 화면에 그리기
    drawNewChat(`me : ${inputValue}`);
    // input 태그 비워주기
    event.target.elements[0].value = '';
  }
};

// draw function
const drawHelloStranger = (username) =>
  (helloStringElement.innerHTML = `Hello ${username} Stranger :)`);
const drawNewChat = (message) => {
  const wrapperCahtBox = document.createElement('div');
  const chatBox = `
    <div>
      ${message}
     <div> 
  `;
  wrapperCahtBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperCahtBox);
};

function helloUser() {
  const username = prompt('What is your name?');
  // 보내는 함수: 'new_user'라는 이벤트로 username 보냄, 익명함수(서버에서 리턴한 데이터)
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();

  // 이벤트 연결 : submit 하는 순간 handleSumbit 함수 동작
  formElement.addEventListener('submit', handleSubmit);
}

init();
