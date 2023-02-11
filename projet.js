// SELECTEURS
const todoinput = document.querySelector(".todo-input")
const todobuttton = document.querySelector(".todo-button")
const todolist = document.querySelector(".todo-list")



// ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
todobuttton.addEventListener("click", addTodo)
todolist.addEventListener("click", deletecheck)
const filterOption = document.querySelector(".filter-todo")
filterOption.addEventListener("input", filterTodo)



//FUNCTIONS
function addTodo(event) {
    event.preventDefault();
    // 
    const TodoDiv = document.createElement("div")
    TodoDiv.classList.add("todo")
    // CREER LE LI
    const newTodo = document.createElement("li")
    newTodo.innerHTML = todoinput.value
    newTodo.classList.add("todo-item");
    TodoDiv.appendChild(newTodo)
    //Ajouter todo au localstorage
    saveLocalTodos(todoinput.value);

    // BOUTTON CHECK
    const completebutton = document.createElement("button");
    completebutton.innerHTML = '<i class="fas fa-check"></i>';
    completebutton.classList.add("complete-btn");
    TodoDiv.appendChild(completebutton)

    // BOUTTON supprimer
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    TodoDiv.appendChild(trashbutton)
    // ajouter notre todo a todo-list
    todolist.appendChild(TodoDiv)
    todoinput.value = "";
}
function deletecheck(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall")
        todo.addEventListener("transitionend", function () {
            todo.remove();

        });
    }

    // CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodo(e) {
    const todos = todolist.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";

                } else {
                    todo.style.display = "none";

                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";

                }

                break;
            }
            });

}
  function saveLocalTodos(todo) {
    //CHEKER SI IL Y A DES ITEMS EXISTANTS
    let todos
    if (localStorage.getItem("todos")===null) {
        todos=[]
    } else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
 }
   function getTodos() {
    let todos
    if (localStorage.getItem("todos")===null) {
        todos=[]
    } else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo) {
        // 
    const TodoDiv = document.createElement("div")
    TodoDiv.classList.add("todo")
    // CREER LE LI
    const newTodo = document.createElement("li")
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item");
    TodoDiv.appendChild(newTodo)
    
    // BOUTTON CHECK
    const completebutton = document.createElement("button");
    completebutton.innerHTML = '<i class="fas fa-check"></i>';
    completebutton.classList.add("complete-btn");
    TodoDiv.appendChild(completebutton)

    // BOUTTON supprimer
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    TodoDiv.appendChild(trashbutton)
    // ajouter notre todo a todo-list
    todolist.appendChild(TodoDiv)
        
    })
   
   }