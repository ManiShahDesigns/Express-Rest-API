document.addEventListener("DOMContentLoaded", function () {
    const todosDiv = document.getElementById('all-todos')

    let generateDataHTML;

    // Api Requests //
    // Get All Todos
    const getAllTodos = async () => {
        const response = await fetch('http://localhost:3000/todos')
        const todos = await response.json()
        return todos;
    }

    // Delete Todo
    const deleteTodo = async (id) => {
        const response = await fetch(`http://localhost:3000/todos/delete/${id}`, { method: 'DELETE' })
    }

    // Delete and Update Todo
    document.addEventListener('click', (e) => {
        // Delete
        if (e.target.classList.contains('delete-todo')) {
            e.preventDefault()
            const id = e.target.getAttribute('data-id')

            deleteTodo(id)
                .then(() => {
                    location.reload();
                })
        }

        // Update
        if (e.target.classList.contains('edit-todo')) {
            const id = e.target.getAttribute('data-id')
            const title = e.target.getAttribute('data-title')

            const updateTodoInput = document.querySelector('.update-todo-field')

            let currentTodo;

            updateTodoInput.value = title

            const form = document.querySelector('.modal-body form')

            form.action = `${form.action}${id}`
        }
    })

    // Show All Todos
    getAllTodos()
        .then(todos => {
            todos.map((todo) => {
                generateDataHTML
                    = `
                        <div class="col-lg-4 col-md-6 col-12 mb-3">
                            <h2 class="mb-4">
                                ${todo.title}
                            </h2>

                            <div>
                                <a 
                                data-id="${todo.id}"
                                data-title = ${todo.title}
                                data-toggle="modal" data-target="#edittodo" class="btn btn-success edit-todo">Edit</a>

                                <a data-id="${todo.id}" href="#" class="btn btn-danger delete-todo">Delete</a>
                            </div>
                        </div>`

                todosDiv.innerHTML = todosDiv.innerHTML + generateDataHTML
            })
        })
        .catch(error => console.error(error))
})