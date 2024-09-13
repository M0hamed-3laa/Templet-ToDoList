let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  //task element
  if (e.target.classList.contains("task")) {
    //toggle completed for the task
    toggleStatusTaskwith(e.target.getAttribute("data-id"));

    //toggle done class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  //Tske data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // add task to page
  addElementToPageFrom(arrayOfTasks);
  //add tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks) {
  //Empty Tasks div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is
    if (task.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delet"));
    div.appendChild(span);
    //add task div to container
    tasksDiv.appendChild(div);
  });
}
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskwith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

let deleteAll = document.querySelector(".button");

deleteAll.onclick = function () {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks");
};
