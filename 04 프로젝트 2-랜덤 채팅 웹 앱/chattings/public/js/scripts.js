const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStringElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// draw function
const drawHelloStranger = (username) =>
  (helloStringElement.innerHTML = `Hello ${username} Stranger :)`);

// global socket handler
socket.on('user_connected', (username) => {
  console.log(`${username} connected!`);
});

function helloUser() {
  const username = prompt('What is your name?');
  // 보내는 함수: 'new_user'라는 이벤트로 username 보냄, 익명함수(서버에서 리턴한 데이터)
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
}

init();
