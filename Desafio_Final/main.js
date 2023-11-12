const todoInput = document.querySelector('.todo-input');
        const todoButton = document.querySelector('.todo-button');
        const todoList = document.querySelector('.todo-list');
        

        todoButton.addEventListener('click', addList);

        let todos = [];

        function addList() {
            
            let newtodo = {
                id: `${Date.now()}`,
                name: todoInput.value,
                completed: "pending",
            };

            if (newtodo.name === "") {
                return;
            }

            todos.push(newtodo);

            localStorage.setItem("todos", JSON.stringify(todos));
            updatedList();
        }

        function removeList(event) {
            let id = event.target.dataset.id;

            todos = todos.filter(function (todo) {
                return todo.id !== id;
            });

            localStorage.setItem("todos", JSON.stringify(todos));
            updatedList();
        }

        function finalizeList(event) {
            let id = event.target.dataset.id;

            todos.find((todo) => todo.id === id).completed = "completed";
            
            localStorage.setItem("todos", JSON.stringify(todos));            
            updatedList();
        }

        function updatedList() {
            todoList.innerHTML = '';
            let filterOption = document.querySelector(".filter-todo").value;
        
            let filteredTodos;
        
            if (filterOption === "all") {
                filteredTodos = todos;
            } else if (filterOption === "completed") {
                filteredTodos = todos.filter((item) => item.completed === "completed");
            } else if (filterOption === "uncompleted") {
                filteredTodos = todos.filter((item) => item.completed === "pending");
            } else {
                filteredTodos = todos;
            }
        
            filteredTodos.forEach((todo) => {
                let todoItem = document.createElement('div');
        
                if (todo.completed === "completed") {
                    todoItem.classList.add('completed');
                }
        
                todoItem.innerHTML = `
                <div class="todo">
                    <li class="todo-item">${todo.name}</li>
                    <button data-id="${todo.id}" onclick="finalizeList(event)" class="check-btn"><i class="fas fa-check" aria-hidden="true"></i></button>
                    <button data-id="${todo.id}" onclick="removeList(event)" class="trash-btn"><i class="fas fa-trash" aria-hidden="true"></i></button>
                </div>`;
        
                todoList.appendChild(todoItem);
            });
        }

      
        if(localStorage.getItem('token') === null){

            alert('Voce precisa estar logado para acessar esta pagina')
            window.location.href = 'index.html'
        }            

        function logout(){
            localStorage.removeItem('token')
            window.location.href = 'index.html'

        }
      
        
        
