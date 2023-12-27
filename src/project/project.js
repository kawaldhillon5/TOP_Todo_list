import todo_item from "../todo_item/todo_item";
class project {
    constructor(arr){
        this.arr = arr;
    }
    addItem = function(todo_item){
        this.arr.push(todo_item);
    }
}

export default project;