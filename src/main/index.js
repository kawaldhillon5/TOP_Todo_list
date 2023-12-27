import "./main.css";
import project from "../project/project";
import todo_item from "../todo_item/todo_item";

let arr = [];
const notes = ["do science first","then maths","science exame tomorrow"]
const p1 = new project(arr);
const l1 = new todo_item("p1", "Homework", "Do todays science and maths homework", "23/12/27", "high", notes);
const l2 = new todo_item("p2", "play", "Play football for x amount of time", "23/12/27", "medium", notes);

p1.addItem(l1);
p1.addItem(l2);
console.table(l1.notes);