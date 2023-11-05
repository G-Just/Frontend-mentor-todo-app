const input = document.getElementById("taskInput");
const taskList = document.getElementById("tasks");
const info = document.getElementById("info");
const count = document.getElementById("count");
const circles = document.getElementsByClassName("circle");

let countLocal = 0;
let globId = 0;
function addTask(text) {
  /* creates a new element and adds it to the "tasks" div,
  adds an unique ID that is used to identify and delete a specific element */
  task = document.createElement("div");
  task.classList.add("task-box");
  task.setAttribute("id", `${globId}`);
  task.innerHTML = `<div class="circle ${globId}" onClick="check(${globId})"></div>
  <p class="input" id='text${globId}'>${text}</p>
  <div class="delete" onClick="del(${globId})">&#x2715;</div>`;
  taskList.insertBefore(task, info);
  input.value = "";
  globId++;
  countLocal++;
  count.innerHTML = `${countLocal} items left`;
}

function del(id) {
  if (id === "all") {
    checked = document.getElementsByClassName("checked");
    [...checked].forEach((element) => {
      document.getElementById(`${element.classList[1]}`).remove();
      countLocal--;
      count.innerHTML = `${countLocal} items left`;
    });
  } else {
    //removes the element when "X" is clicked
    document.getElementById(`${id}`).remove();
    countLocal--;
    count.innerHTML = `${countLocal} items left`;
  }
}

document.addEventListener("keypress", function (btn) {
  //"enter" keypress will submit the new todo item
  if (btn.key === "Enter") {
    addTask(`${input.value}`);
  }
});

function check(id) {
  //checks and un-checks the checkbox when clicked
  checkbox = document.getElementsByClassName(`${id}`);
  text = document.querySelector(`#text${id}`);
  if (!checkbox[0].classList.contains("checked")) {
    checkbox[0].classList.add("checked");
    checkbox[0].style.background =
      "linear-gradient(120deg, rgba(87, 221, 255, 1) 0%, rgba(192, 88, 243, 1) 100%)";
    checkbox[0].style.padding = "0 3.5px";
    checkbox[0].innerHTML = `<img src='./images/icon-check.svg'/>`;
    text.style.textDecoration = "line-through";
    text.style.color = `hsl(234, 11%, 52%)`;
  } else {
    checkbox[0].classList.remove("checked");
    checkbox[0].style.background = "transparent";
    checkbox[0].style.padding = "0 3.5px";
    checkbox[0].innerHTML = ``;
    text.style.textDecoration = "none";
    text.style.color = ``;
  }
}

function filter(by) {
  //filters the task by selected criteria
  all = document.getElementById("all");
  active = document.getElementById("active");
  completed = document.getElementById("completed");
  [all, active, completed].forEach((element) => element.classList.remove("active"));
  document.getElementById(by).classList.add("active");
  switch (document.getElementById(by).id) {
    case "all":
      [...document.getElementsByClassName("task-box")].forEach(
        (element) => (element.style.display = "")
      );
      break;
    case "active":
      [...document.getElementsByClassName("task-box")].forEach(
        (element) => (element.style.display = "")
      );
      circle = [...document.getElementsByClassName("circle")];
      circle.forEach((element) => {
        if (element.classList.contains("checked")) {
          document.getElementById(`${element.classList[1]}`).style.display = "none";
        }
      });
      break;
    case "completed":
      [...document.getElementsByClassName("task-box")].forEach(
        (element) => (element.style.display = "")
      );
      circle = [...document.getElementsByClassName("circle")];
      circle.forEach((element) => {
        if (!element.classList.contains("checked")) {
          document.getElementById(`${element.classList[1]}`).style.display = "none";
        }
      });
      break;
  }
}
