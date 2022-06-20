const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStringElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
  const username = prompt('What is your name?');
}

function init() {
  helloUser();
}

init();
