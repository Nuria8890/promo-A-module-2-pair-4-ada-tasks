"use strict";

const ul = document.querySelector(".js-ul");
const GITHUB_USER = "Nuria8890";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;
const inputAdd = document.querySelector(".js-inputAddTask");
const btnAdd = document.querySelector(".js-btnAddTask");

let tasks = [];

// Pinta las tareas en el html
const paintingTasks = (tasksToPaint) => {
  ul.innerHTML = "";
  for (const task of tasksToPaint) {
    const newLi = document.createElement("li");
    newLi.classList = task.completed === true ? "strike" : "";

    const newInput = document.createElement("input");
    newInput.type = "checkbox";
    newInput.id = task.id;
    newInput.name = "tasks";
    newInput.value = task.id;
    if (task.completed) {
      newInput.setAttribute("checked", task.completed);
    }
    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", task.id);
    const newContentLabel = document.createTextNode(task.name);

    newLi.appendChild(newInput);
    newLabel.appendChild(newContentLabel);
    newLi.appendChild(newLabel);
    ul.appendChild(newLi);
  }

  // ul.innerHTML = "";
  // for (const task of tasksToPaint) {
  //   ul.innerHTML += `
  //     <li class="${task.completed === true ? "strike" : ""}">
  //       <input type="checkbox" id="${task.id}" name="tasks" value="${
  //     task.id
  //   }" ${task.completed === true ? "checked" : ""}>
  //       <label for="${task.id}">
  //       ${task.name}
  //       </label>
  //     </li>
  //     `;
  // }
};

// Almacena las tareas que hay en localStorage
const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));

if (tasksLocalStorage !== null) {
  tasks = tasksLocalStorage;
  paintingTasks(tasksLocalStorage);
} else {
  // Obten el listado de tareas desde la API
  fetch(`https://dev.adalab.es/api/todo/${GITHUB_USER}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      tasks = data.results;
      // Pintar la lista en html
      paintingTasks(tasks);
    })
    .catch((error) => {
      console.error(error);
    });
}

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
  paintingTasks(tasks);
};

ul.addEventListener("click", handleClickList);

const handleClickBtnAdd = (event) => {
  event.preventDefault();
  const inputTask = inputAdd.value;

  const newTask = {
    name: inputTask,
    completed: false,
    // Como no existe id, las nuevas tareas no se tachan
  };
  tasks.push(newTask);
  console.log("tasks es", tasks);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  paintingTasks(tasks);
};

btnAdd.addEventListener("click", handleClickBtnAdd);
