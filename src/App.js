import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        this.TodoListModel = new TodoListModel();
    }
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const conteinerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        this.TodoListModel.onChange(() => {
            const todoListElement = element`<ul />`;
            const todoItems = this.TodoListModel.getTodoItems();
            todoItems.forEach(item => {
                const todoItemElement  = item.completed
                ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
                : element`<li><input type="checkbox" class="checkbox">${item.title}</s></li>`

                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    this.TodoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                });
                todoListElement.appendChild(todoItemElement);
            })

            render(todoListElement, conteinerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.TodoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();

            this.TodoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
        })
    }
}