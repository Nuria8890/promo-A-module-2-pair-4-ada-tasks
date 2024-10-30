'use strict';

const ul = document.querySelector('.js-ul');

const tasks = [
  { name: "Recoger setas en el campo", completed: true, id: 1 },
  { name: "Comprar pilas", completed: true, id: 2 },
  { name: "Poner una lavadora de blancos", completed: true, id: 3 },
  {
    name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
    completed: false,
    id: 4,
  },
];

// Pintar la lista en html

for (const task of tasks) {
  ul.innerHTML += `
  <li class="${task.completed === true ? 'strike' : ""}">
    <input type="checkbox" id="${task.id}" name="tasks" value="${task.id}">
    <label for="${task.id}">
    ${task.name}
    </label>
  </li>
  `
}

const handleClick = (event) => {
  const taskId = parseInt(event.target.id);
  console.log(taskId);
  if (!taskId) return;

//   tasks.find((taskId) => {
//     console.log('taskId es:', taskId);
//   })
}

ul.addEventListener('click', handleClick);

