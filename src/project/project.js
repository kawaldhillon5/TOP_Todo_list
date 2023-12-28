import todo_item from "../todo_item/todo_item";
import createElement from "../functions/functions";

class project {
    constructor(name,projectDueDate,arr){
        this.name = name;
        this.projectDueDate = projectDueDate;
        this.arr = arr;
        
    }
    addItem = function(Todo_item){
        this.arr.push(Todo_item);
    }
}





export default project;