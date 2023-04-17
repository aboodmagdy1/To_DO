let input = document.querySelector('.input')
let submit = document.querySelector('.add')
let tasksDiv = document.querySelector('.tasks')
// Empty array to stor the Tasks
let ArrayOfTasks = []
// check if there is tasks in local storage
// عشان لما اعمل ريلود ميمسحش الي مجود ف اللوكال استورج
if (window.localStorage.getItem('tasks')) {
  ArrayOfTasks = JSON.parse(window.localStorage.getItem('tasks'))
}

//trigger get data from local storage
getDataFromLocalStorage()

// add to array when click on submit
submit.onclick = function () {
  if (input.value !== '') {
    addTaskToArray(input.value) // Add Task To Array Of Tasks
    input.value = '' // Empty Input Field
  }
}

// click On Task element
tasksDiv.addEventListener('click', e => {
  if (e.target.classList.contains('delet')) {
    // remove elment form local storage
    deleteTaskWith(e.target.parentElement.getAttribute('data-id'))
    // remove element form pageeeeee
    e.target.parentElement.remove()
  }
  // toggle status
  toggleStatusWith(e.target.getAttribute('data-id'))
  //  task elements
  if (e.target.classList.contains('task')) {
    e.target.classList.toggle('done')
  }
})

function addTaskToArray (TaskText) {
  //  task data
  const task = {
    id: Date.now(),
    title: TaskText,
    completed: false
  }

  // Push this task to ArrayOfTasks
  ArrayOfTasks.push(task)

  // Add Tasks To Page
  addElementsToPageFrom(ArrayOfTasks)
  // addtasks to localstorage
  addDataToLocalStorageFrom(ArrayOfTasks)
  //
}

function addElementsToPageFrom (ArrayOfTasks) {
  // empty the tasks div
  tasksDiv.innerHTML = ''

  // looping on array of tasks
  ArrayOfTasks.forEach(task => {
    // creat main div
    let div = document.createElement('div')
    div.className = 'task'
    // check if task i done
    if (task.completed) {
      // السطر ده هيعمل اوفر رايت الاول لو ترووو عشان يضيف الثيرات الاكتمال
      div.className = 'task done'
    }
    div.setAttribute('data-id', task.id)
    div.appendChild(document.createTextNode(task.title))

    // creat delet button
    let span = document.createElement('span')
    span.className = 'delet'
    span.appendChild(document.createTextNode('Delete'))
    div.appendChild(span)

    tasksDiv.appendChild(div)
  })
}

function addDataToLocalStorageFrom (ArrayOfTasks) {
  window.localStorage.setItem('tasks', JSON.stringify(ArrayOfTasks))
}

function getDataFromLocalStorage () {
  let data = window.localStorage.getItem('tasks')
  if (data) {
    let tasks = JSON.parse(data)
    addElementsToPageFrom(tasks)
  }
}

function deleteTaskWith (taskId) {
  ArrayOfTasks = ArrayOfTasks.filter(task => task.id != taskId)
  addDataToLocalStorageFrom(ArrayOfTasks)
}

function toggleStatusWith (taskId) {
  for (let i = 0; i < ArrayOfTasks.length; i++) {
    if (ArrayOfTasks[i].id == taskId) {
      ArrayOfTasks[i].completed == false
        ? (ArrayOfTasks[i].completed = true)
        : (ArrayOfTasks[i].completed = false)
    }
  }
  addDataToLocalStorageFrom(ArrayOfTasks)
}

let clear = document.querySelector('.clear-all')
clear.addEventListener('click', function () {
  tasksDiv.innerHTML = ''
  ArrayOfTasks = []
  window.localStorage.clear()
})
