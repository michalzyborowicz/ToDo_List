let todoInput // place where user writes task
let errorInfo // information about not having any task
let addBtn // Add button-adds new task to list
let ulList // list of tasks (ul tags)
let newTasks // new li element
let popup // this is popup for editing of tasks
let popupInfo //this is information about epmty string in text field
let todoToEdit //edited task
let popupInput //newt task that replacing old one
let popupAddBtn // "confirm" button in popup
let popupCloseBtn //"cancel" button in popup



const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

// This function is going to fetch elements
const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}

//This function is responsiblie for event listeners
const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTask)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)
}

//This function adds new tasks to list

const addNewTask = () => {
	if (todoInput.value !== '') {
		newTasks = document.createElement('li')
		newTasks.textContent = todoInput.value
		ulList.append(newTasks)

		createToolsArea()

		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'You didnt wrote anything'
	}
}

//This function adds buttons to new tasks

const createToolsArea = () => {
	//this is 'container' for our buttons
	const toolsBtns = document.createElement('div')
	toolsBtns.classList.add('tools')
	newTasks.append(toolsBtns)

	//here i'm creating: complete, edit and delete buttons

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsBtns.append(completeBtn, editBtn, deleteBtn)
}

//This function adds functionalities to task button

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

//This functions is responsible for editing of tasks

const editTodo = e => {
	todoToEdit = e.target.closest('li')
	popupInput.value = todoToEdit.firstChild.textContent

	popup.style.display = 'flex'
}
const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popupInfo.textContent = ''
		popup.style.display = 'none'
	} else {
		popupInfo.textContent = 'You have to write something'
	}
}

//This Function closes popup without any changes

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

//this function is going to remove tasks from the list

const deleteTodo = (e) => {
	e.target.closest('li').remove()
	const allTasks = ulList.querySelectorAll('li')
	if(allTasks.length === 0 ) {
		errorInfo.textContent = 'Your list is epmty.'
	}
}
//this function adds taksk by pressing "enter" buttons

const enterKeyCheck = (e) => {
	if(e.key ==='Enter'){
		addNewTask()
	}
}


document.addEventListener('DOMContentLoaded', main)
