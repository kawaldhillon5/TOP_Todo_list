import "./main.css";
import  project  from "../project/project";
import { createProject } from "../functions/functions";
import todo_item from "../todo_item/todo_item";

const content = document.querySelector("#content");

content.appendChild(createProject());
