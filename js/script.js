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
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

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
        storeTaskInLocalStorage(taskInput.value);
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
            removeFromLocalStorage(ele);
        }
    }
}

//Clear Task
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        clearTasksFromLocalStorage();
    }
}

//Filter Task
function filterTask(e) {
    let text = e.target.value.toLowerCase();
    
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {//indexOf(substring)
            console.log(item.toLowerCase().indexOf(text));
            task.style.display = "block";
        }
        else {
            task.style.display = "none";
        }
    })
}

//Store in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks')===null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Get Tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        //Create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task +
        " "));//space before cross sign
        let link = document.createElement('a');
        link.setAttribute('href', '#');//click option will appear
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

//Remove task from Local Storage
function removeFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);//removing <a href="#">x</a>
    
    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task) {
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear all tasks from Local Storage
function clearTasksFromLocalStorage() {
    // let tasks = [];
    // localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.clear();
}