import { element, render } from "./view/html-util.js";

export class App {
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const conteinerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        const todoListElement = element`<ul />`;
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            todoListElement.appendChild(todoItemElement);
            render(todoListElement, conteinerElement);

            const todoItemCount = todoListElement.childElementCount;
            console.log(todoItemCount);
            todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
            inputElement.value = ""
        })
    }
}