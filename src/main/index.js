import "./main.css";
import  project  from "../project/project";
import { createProjectForm } from "../functions/functions";
import { insertHtml } from "../functions/functions";
import { createElementDom } from "../functions/functions";
import todo_item from "../todo_item/todo_item";

//const content = document.querySelector("#content");
let ProjectArr = [];
createProjectForm(ProjectArr);

