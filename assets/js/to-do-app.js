
function changeMode(){
  const container = document.querySelector('.container');
  container.classList.toggle('dark-mode');
  if(container.classList.contains('dark-mode')){
    switchModeBtn.src = 'assets/images/light-mode-btn.svg';
  } else{
    switchModeBtn.src = 'assets/images/dark-mode-btn.svg';
  }
}

function selectBtn(){
  const deleteTodoBtns = document.querySelectorAll('.delete-todo-btn');
  for(const deleteTodoBtn of deleteTodoBtns){
    deleteTodoBtn.addEventListener('click', deleteTodo);
  }
}

function selectTodo(){
  const checkTodos = document.querySelectorAll('.checkbox-container');
  for(const checkTodo of checkTodos){
    checkTodo.addEventListener('input', changeTodo);
  }
}

function addTodo(){
  if(addTodoInput.value.trim() !== ''){
    todoList.insertAdjacentHTML('afterbegin', `<li>
            <div class="todo-list__wrapper">
              <label class="checkbox-container">
                <input type="checkbox" class="not-completed-todos">
                <span class="checkmark"></span>
              </label>
              <p>${addTodoInput.value} </p>
            </div>
            <img class="delete-todo-btn" src="assets/images/x.svg" alt="Delete Button">
          </li>`);
    addTodoInput.value = '';
    selectBtn();
    selectTodo();
    sperateTodos();
  } else{
    alert('You cannot submit an empty to-do. Please enter a task.');
  }
}

function deleteTodo(){
  if(confirm('Are you sure you want to delete this task?')){
    this.closest('li').remove();
    sperateTodos();
  }
}

function changeTodo(){
  this.closest('div').classList.toggle('completed-todo-text');
  sperateTodos();
}

function sperateTodos(){
  let activeTodos = [];
  let completedTodos = [];
  const todos = document.querySelectorAll('.todo-list__wrapper');

  for(const todo of todos){
    if(todo.classList.contains('completed-todo-text')){
      if (!completedTodos.includes(todo)) {
        completedTodos.push(todo);
      } else if(completedTodos.includes(todo)){
        completedTodos.splice(todo, 1);
      }
    } else{
      if (!activeTodos.includes(todo)) {
        activeTodos.push(todo);
      } else if(activeTodos.includes(todo)){
        activeTodos.splice(todo, 1);
      }
    }
  }

  for(const todo of todos){
    if(todo.classList.contains('completed-todo-text')){
      if (!completedTodos.includes(todo)) {
        completedTodos.push(todo);
      }
    } else{
      if (!activeTodos.includes(todo)) {
        activeTodos.push(todo);
      }
    }
  }
  leftTodos.innerText = activeTodos.length - 1;
  // localStorage.completedTodos = JSON.stringify(completedTodos);
  // localStorage.activeTodos = JSON.stringify(activeTodos);
}

function deleteCompletedTodos(){
  if(confirm('Are you sure you want to delete completed tasks?')){
    for(const completedTodo of completedTodos){
      completedTodo.closest('li').remove();
    }
  }
  sperateTodos();
}

function showCompletedTodos(){
  const selectedTodos = document.querySelectorAll('.todo-type');
  for(const selectedTodo of selectedTodos){
    selectedTodo.classList.remove('selected-todo');
    this.classList.add('selected-todo');
  }
  for(const activeTodo of activeTodos){
    activeTodo.closest('li').style.display = 'none';
    lastOne.style.display = 'flex';
  }
  for(const completedTodo of completedTodos){
    completedTodo.closest('li').style.display = 'flex';
  }
  sperateTodos();
}

function showActiveTodos(){
  const selectedTodos = document.querySelectorAll('.todo-type');
  for(const selectedTodo of selectedTodos){
    selectedTodo.classList.remove('selected-todo');
    this.classList.add('selected-todo');
  }
  for(const completedTodo of completedTodos){
    completedTodo.closest('li').style.display = 'none';
  }
  for(const activeTodo of activeTodos){
    activeTodo.closest('li').style.display = 'flex';
  }
  sperateTodos();
}

function showAllTodos(){
  const selectedTodos = document.querySelectorAll('.todo-type');
  for(const selectedTodo of selectedTodos){
    selectedTodo.classList.remove('selected-todo');
    this.classList.add('selected-todo');
  }
  for(const completedTodo of completedTodos){
    completedTodo.closest('li').style.display = 'flex';
  }
  for(const activeTodo of activeTodos){
    activeTodo.closest('li').style.display = 'flex';
  }
  sperateTodos();
}

selectTodo();
selectBtn();
sperateTodos();
switchModeBtn.addEventListener('click', changeMode);
allTodosBtn.addEventListener('click', showAllTodos);
allTodosBtnDesktop.addEventListener('click', showAllTodos);
activeTodosBtn.addEventListener('click', showActiveTodos);
activeTodosBtnDesktop.addEventListener('click', showActiveTodos);
completedTodosBtn.addEventListener('click', showCompletedTodos);
completedTodosBtnDesktop.addEventListener('click', showCompletedTodos);
clearCompletedTodosBtn.addEventListener('click', deleteCompletedTodos);
addTodoBtn.addEventListener('click', addTodo);