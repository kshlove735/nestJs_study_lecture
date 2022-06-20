const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStringElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
  const username = prompt('What is your name?');
  // 보내는 함수: 'new_user'라는 이벤트로 username 보냄, 익명함수(서버에서 리턴한 데이터)
  socket.emit('new_user', username, (data) => {
    console.log(data);
  });
  console.log(username);
  socket.on('hello_user', (data) => {
    console.log(data);
  });
}

function init() {
  helloUser();
}

init();
