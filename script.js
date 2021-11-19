const addTaskBtn = document.querySelector('#criar-tarefa');
const input = document.querySelector('#texto-tarefa');
const olTaskList = document.querySelector('#lista-tarefas');

// Adciona tarefas do input na lista ordenada
function addTaskToList(task, completed) {
  const newTask = document.createElement('li');
  newTask.setAttribute('class', 'task');
  if (completed) newTask.classList.add('completed');
  newTask.innerHTML = task;
  olTaskList.appendChild(newTask);
}

// Limpa o input depois que uma terefa foi inserida
addTaskBtn.addEventListener('click', () => {
  if (input.value !== '') {
    addTaskToList(input.value, false);
    input.value = '';
  }
});

// troca a cor do fundo para cinza quando clicado duas vezes
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('task')) {
    const tasks = document.querySelector('#lista-tarefas').children;
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].style.background = 'none';
      tasks[i].classList.remove('selected');
    }
    e.target.style.background = 'rgb(128, 128, 128)';
    e.target.classList.add('selected');
  }
});

// insere e remove a classe completed do HTML para ficar com line through
document.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('task')) {
    const element = e.target;
    element.classList.toggle('completed');
  }
});

// Limpa todas as terefas (completas e não completas) quando clica em "apagar tudo"
const clearAllBtn = document.querySelector('#apaga-tudo');
clearAllBtn.addEventListener('click', () => {
  olTaskList.innerHTML = '';
});

// remove todos as terefas com classe completed ao clicar no botão "apagar finalizados"
const clearCompletedBtn = document.querySelector('#remover-finalizados');
clearCompletedBtn.addEventListener('click', () => {
  const completeTasks = document.querySelectorAll('.completed');
  for (let i = 0; i < completeTasks.length; i += 1) {
    completeTasks[i].remove();
  }
});

// Funcao usada em todo o restante do código para salvar tarefas num array
function saveTasksStorage() {
  const arrayTasks = [];
  const tasks = document.querySelectorAll('.task');
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].classList.contains('completed')) {
      arrayTasks.push([tasks[i].innerHTML, 'completed']);
    } else {
      arrayTasks.push([tasks[i].innerHTML, 'not-completed']);
    }
  }
  const jsonTasks = JSON.stringify(arrayTasks);
  localStorage.setItem('tasksSaved', jsonTasks);
}

function verifyTaskComplete(tasks) {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i][1] === 'completed') {
      addTaskToList(tasks[i][0], true);
    } else {
      addTaskToList(tasks[i][0], false);
    }
  }
}

function loadTasksSaved() {
  if (localStorage.getItem('tasksSaved')) {
    let tasksSaved = localStorage.getItem('tasksSaved');
    tasksSaved = JSON.parse(tasksSaved);
    verifyTaskComplete(tasksSaved);
  }
}
const saveBtn = document.querySelector('#salvar-tarefas');
saveBtn.addEventListener('click', () => {
  saveTasksStorage();
});

const upBtn = document.querySelector('#mover-cima');
upBtn.addEventListener('click', () => {
  const selected = document.querySelector('.selected');
  if (selected && selected.previousElementSibling) {
    const previousElement = selected.previousElementSibling;
    previousElement.insertAdjacentElement('beforebegin', selected);
  }
});

const downBtn = document.querySelector('#mover-baixo');
downBtn.addEventListener('click', () => {
  const selected = document.querySelector('.selected');
  if (selected && selected.nextElementSibling) {
    const nextElement = selected.nextElementSibling;
    nextElement.insertAdjacentElement('afterend', selected);
  }
});

const removeSelectedTaskBtn = document.querySelector('#remover-selecionado');
removeSelectedTaskBtn.addEventListener('click', () => {
  const element = document.querySelector('.selected');
  if (element) {
    element.remove();
  }
});

loadTasksSaved();
