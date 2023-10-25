//Start of a journey
//Define UI element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_tasks_btn');
let filter = document.querySelector("#task_filter");
let taskInput = document.querySelector('#new_task');


//Define event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);

//Define functions
//Add Task
function addTask() {
    if(taskInput.value === '') {
        alert("Add a task!");
    }
    else {
        //Create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value +
        " "));//space before cross sign
        let link = document.createElement('a');
        link.setAttribute('href', '#');//click option will appear
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
        taskInput.value = "";//emptying the taskInput value
    }
    //e.preventDefault();//prevents the reload after form submit
}

//Remove Task
function removeTask(e) {
    if(e.target.hasAttribute("href")) {
        if(confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove();
        }
    }
}

//Clear Task
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}