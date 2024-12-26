const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');


let tasks = [];

if (localStorage.getItem('tasks') ) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}


tasks.forEach(function(task){
	const cssClass = task.done ? "task-title task-title--done" : "task-title";


 // формируем рвзметку для новой задачи
 const taskHtml = `	
				<li  id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					 <span class="${cssClass}">${task.text}</span>
					 <div class="task-item__buttons">
						 <button type="button" data-action="done" class="btn-action">
							 <img src="./img/tick.svg" alt="Done" width="18" height="18">
						 </button>
						 <button type="button" data-action="delete" class="btn-action">
							 <img src="./img/cross.svg" alt="Done" width="18" height="18">
						 </button>
					 </div>
				 </li>
 `;
 
 // добавим задачу на страницу
  tasksList.insertAdjacentHTML('beforeend', taskHtml)
})

checkEmptyList();


form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)


// функции
function addTask(event) {
	
 // отменяет отправку формы
 event.preventDefault();
   
 // достаем текст задачи из поля ввода
 const taskText = taskInput.value

 const newTask = {
	id: Date.now(),
	text: taskText,
	done: false,
 };

//  добавляем задачу в localstorage
tasks.push(newTask)

//добавляем задачу в массив с задачами
saveToLocalStorage();

   
// формируем css класс
const cssClass = newTask.done ? "task-title task-title--done" : "task-title";


 // формируем рвзметку для новой задачи
 const taskHtml = `	
				<li  id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					 <span class="${cssClass}">${newTask.text}</span>
					 <div class="task-item__buttons">
						 <button type="button" data-action="done" class="btn-action">
							 <img src="./img/tick.svg" alt="Done" width="18" height="18">
						 </button>
						 <button type="button" data-action="delete" class="btn-action">
							 <img src="./img/cross.svg" alt="Done" width="18" height="18">
						 </button>
					 </div>
				 </li>
 `;
 
 // добавим задачу на страницу
  tasksList.insertAdjacentHTML('beforeend', taskHtml)
 
 //  очищения поля ввода и возвращаем на него фокус
 taskInput.value = ""
 taskInput.focus()
 

 checkEmptyList();

}

function deleteTask(event) {
// проверка что клик был по кнопке удалить
if(event.target.dataset.action !== 'delete') return;


		const parenNode = event.target.closest('.list-group-item');
           
		// определяю айди задачи
        const id = Number(parenNode.id);
	  
		// находим индекс в массиве 
		const index = tasks.findIndex( (task) =>   task.id === id);
		  
		saveToLocalStorage();
   
		//удаляем задачу из массива
    tasks.splice(index, 1)

		// удаляю задачу из разметки
		parenNode.remove()

checkEmptyList();

}

function doneTask (event) {
	// проверка что клик был по кнопке 'готово'
	if (event.target.dataset.action !== 'done') return 


		const parentNode = event.target.closest('.list-group-item');
        
		// определяем айди задачи

		const id = Number(parentNode.id);
		const task = tasks.find( (task) =>  task.id === id)
          task.done = !task.done

		  saveToLocalStorage();


		const taskTitle = parentNode.querySelector('.task-title');
		taskTitle.classList.toggle	('task-title--done');


}

function checkEmptyList() {
	if (tasks.length === 0) {
      const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
				tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}

	if(tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;
	}
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}