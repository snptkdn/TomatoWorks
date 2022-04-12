import { render } from "./view/html-util.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/todoListView.js";

export class App {
    constructor() {
        this.todoListView = new TodoListView();
        this.TodoListModel = new TodoListModel();
    }

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title
     */
    handleAdd(title) {
        this.TodoListModel.addTodo(new TodoItemModel({ title, completed: false }));
    }

    /**
     * Todoを更新するときに呼ばれるリスナー関数
     * @param {{id:number, completed: boolean}} 
     */
    handleUpdate({ id, completed }) {
        this.TodoListModel.updateTodo({ id, completed });
    }

    /**
     * Todoを削除するときに呼ばれるリスナー関数
     * @param {{id:number}} 
     */
    handleDelete({ id }) {
        this.TodoListModel.deleteTodo({ id });
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const conteinerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        this.TodoListModel.onChange(() => {
            const todoItems = this.TodoListModel.getTodoItems();
            const todoListView = new TodoListView();

            const todoListElement = todoListView.createElement(todoItems, {
                onUpdateTodo: ({id, completed}) => {
                    this.handleUpdate({ id, completed });
                },
                onDeleteTodo: ({id}) => {
                    this.handleDelete({ id });
                }
            })

            render(todoListElement, conteinerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.TodoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();

            this.handleAdd(inputElement.value);
            inputElement.value = "";
        })
    }
}