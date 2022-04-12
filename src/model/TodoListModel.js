import { EventEmitter } from "../EventEmitter.js";
import { TodoItemModel } from "./TodoItemModel.js";

export class TodoListModel extends EventEmitter {
    /**
     * @param {TodoItemModel[]} [items] 初期アイテム一覧
     */
    constructor(items = []) {
        super();
        this.items = items;
    }

    /**
     * TodoItemの合計個数をカウントする
     */
    getTotalCount() {
        const lenOfunCheckedTodo = this.items.filter( item => {
            return !item.completed;
        });
        return lenOfunCheckedTodo.length;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns {TodoItemModel[]} 
     */
    getTodoItems() {
        return this.items;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する。
     * @param {Function} listener
     */
    onChange(listener) {
        this.addEventListener("change", listener);
    }

    /**
     * 状態が変更されたときに呼ぶ。登録済のリスナー関数を呼び出す
     */
    emitChange() {
        this.emit("change");
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem) {
        this.items.push(todoItem);
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemのcompletedを更新する
     * @param {{ id:Number, completed: boolean}}
     */
    updateTodo({ id, completed }) {
        const todoItem = this.items.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = completed;
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemを削除する。
     * @param {{ id: Number }}
     */
    deleteTodo({ id }) {
        this.items = this.items.filter(todo => {
            return todo.id !== id;
        });
        this.emitChange();
    }
}