let todoIdx = 0;

export class TodoItemModel {
    /**
     * @param {string} title Todoアイテムのタイトル
     * @param {boolean} completed Todoアイテムが完了済みならばtrue, 否はfalse
     */
    constructor({ title, completed}) {
        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
    } 
}