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
    <input type="checkbox" id="${task.id}" name="tasks" value="${task.id}" ${task.completed === true ? 'checked' : ""}>
    <label for="${task.id}">
    ${task.name}
    </label>
  </li>
  `
}

const handleClick = (event) => {
  console.log('event.currentTarget es:', event.currentTarget)
  console.log('event.target es:', event.target)
  const taskId = parseInt(event.target.id);
  console.log(taskId);
  if (!taskId) return;

  // Busca la tarea que tenga el id `taskId` en el array `tasks`
  const checkedTask = tasks.find((task) => {
    return task.id === taskId;
  })
  console.log('checkedTask es:', checkedTask);

  // Una vez que has obtenido la tarea, actualiza la propiedad `completed`
  checkedTask.completed = !checkedTask.completed;
  
  /* Lo de arriba es igual que esto: 
    if (checkedTask.completed === true) {
      checkedTask.completed = false;
    } else {
      checkedTask.completed = true;
    }
  */

  // Pinta de nuevo las tareas en el html
  ul.innerHTML = "";
  for (const task of tasks) {
    ul.innerHTML += `
    <li class="${task.completed === true ? 'strike' : ""}">
      <input type="checkbox" id="${task.id}" name="tasks" value="${task.id}" ${task.completed === true ? 'checked' : ""}>
      <label for="${task.id}">
      ${task.name}
      </label>
    </li>
    `
  }
}

ul.addEventListener('click', handleClick);

