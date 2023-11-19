let taskInput = document.getElementById("taskInput");
let dateInput = document.getElementById("dateInput");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let kobry = 0;
let taskContainer;

window.onload = function () {
  if (localStorage.getItem("task") !== null) {
    taskContainer = JSON.parse(localStorage.getItem("task"));
    displayTask(taskContainer);
  } else {
    taskContainer = [];
  }
};

function addTask() {
  if (validateDate() && validateTask()) {
    let task = {
      title: taskInput.value,
      date: dateInput.value,
    };
    taskContainer.push(task);
    localStorage.setItem("task", JSON.stringify(taskContainer));
    displayTask(taskContainer);
    clear();
  }
}

function displayTask(arr) {
  var cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-lg-12 ">
        <div class="form-check d-flex align-items-center px-3">
            <input type="checkbox" class="form-check-input mx-0" name="" id="${arr[i].title}">
            <label for="${arr[i].title}" class="form-check-label">${arr[i].title}</label>
            <div class="icon ms-auto d-flex align-items-center gap-2">
                <i class="fa-solid fa-trash-can text-danger" onclick="deleteTask(${i})"></i>
                <i class="fa-solid fa-edit text-success" onclick="getValues(${i})"></i>
                <div class="bg-white border border-warning rounded p-2">
                    <i class="fa-solid fa-hourglass-half text-warning"></i>
                    <span>${arr[i].date}</span>
                </div>
            </div>
        </div>

    </div>
        `;
  }
  document.getElementById("taskContent").innerHTML = cartona;
}

function deleteTask(id) {
  taskContainer.splice(id, 1);
  localStorage.setItem("task", JSON.stringify(taskContainer));
  displayTask(taskContainer);
}

function clear() {
  taskInput.value = "";
  dateInput.value = "";
}

function validateDate() {
  var currentDate = new Date().toJSON().slice(0, 10);
  if (dateInput.value < currentDate) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter a valid Date!",
    });
    return false;
  } else {
    Swal.fire({
      icon: "success",
      title: "Task Added",
    });
    return true;
  }
}

function validateTask() {
  if (taskInput.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter a valid Task Name!",
    });
    return false;
  } else {
    Swal.fire({
      icon: "success",
      title: "Task Added",
    });
    return true;
  }
}

function getValues(idx) {
    addBtn.classList.replace("d-block", "d-none");
    updateBtn.classList.replace("d-none", "d-block");
    taskInput.value = taskContainer[idx].title;
    dateInput.value = taskContainer[idx].date;
    kobry = idx;
}

function updateValues() {
    if(validateDate() == false){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter a valid Date!",
          });
    }
    else if(validateTask() == false){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter a valid Task Name!",
          });
    }else{
        let updatedTask = {
            title: taskInput.value,
            date: dateInput.value
        }
        taskContainer.splice(kobry,1,updatedTask)
        localStorage.setItem("task",JSON.stringify(taskContainer))
        displayTask(taskContainer)
        clear()
        Swal.fire({
          icon: "success",
          text: "Task Updated!",
        });
        addBtn.classList.replace("d-none", "d-block");
        updateBtn.classList.replace("d-block", "d-none");
    }
}

addBtn.addEventListener("click", addTask);
updateBtn.addEventListener("click", updateValues)