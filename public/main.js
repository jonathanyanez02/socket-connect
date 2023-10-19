const socket = io();

const form = document.querySelector('form');
const input = document.getElementById('message');
const ul = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('chat message', input.value);
  input.value = '';
});

socket.on('chat message', (message) => {
  const li = document.createElement('li');
  li.textContent = message;
  ul.appendChild(li);
});
