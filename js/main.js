"use strict";

const ul = document.querySelector(".js-ul");
const GITHUB_USER = "Nuria8890";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;
const inputAdd = document.querySelector(".js-inputAddTask");
const btnAdd = document.querySelector(".js-btnAddTask");

let tasks = [];

// Pinta las tareas en el html
const paintingTasks = () => {
  ul.innerHTML = "";
  for (const task of tasks) {
    ul.innerHTML += `
      <li class="${task.completed === true ? "strike" : ""}">
        <input type="checkbox" id="${task.id}" name="tasks" value="${
      task.id
    }" ${task.completed === true ? "checked" : ""}>
        <label for="${task.id}">
        ${task.name}
        </label>
      </li>
      `;
  }
};

// Obtener el listado de tareas desde la API
fetch(`https://dev.adalab.es/api/todo/${GITHUB_USER}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    tasks = data.results;

    // Pintar la lista en html
    paintingTasks();
  });

const handleClickList = (event) => {
  const taskId = parseInt(event.target.id);
  if (!taskId) return;

  // Busca la tarea que tenga el id `taskId` en el array `tasks`
  const checkedTask = tasks.find((task) => {
    return task.id === taskId;
  });

  // Una vez que has obtenido la tarea, actualiza la propiedad `completed`
  checkedTask.completed = !checkedTask.completed;

  // Pintar la lista en html
  paintingTasks();
};

ul.addEventListener("click", handleClickList);

const handleClickBtnAdd = (event) => {
  event.preventDefault();
  const inputTask = inputAdd.value;

  const newTask = {
    name: inputTask,
    completed: false,
  };
  tasks.push(newTask);
  console.log("tasks es", tasks);

  paintingTasks();
};

btnAdd.addEventListener("click", handleClickBtnAdd);
