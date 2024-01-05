import project from "../project/project";
import { createElementDom, todayDate, getDueDateComp, insertHtml, appendProject } from "../functions/functions";
import { compareAsc } from "date-fns";
import todo_item from "../todo_item/todo_item";


class myProject {

    constructor(name) {
        this.name = name;
    }

    getName = function(){
        return this.name;
    }

    getfunction = function(mainArr){

        const target = document.createElement("div");
        const head = createElementDom("div","class","content_head");
        head.textContent = this.name;
        target.appendChild(head);
        const projectsDiv = createElementDom("div","class","projects_div");
        target.appendChild(projectsDiv);

        mainArr.forEach(element => {

            projectsDiv.appendChild(appendProject(element));

        });
        return target;
    }

}

class today {

    constructor(name){
        this.name = name;
    }

    getName = function(){
        return this.name;
    }

    getfunction = function(mainArr){
        const target = document.createElement("div");
        const head = createElementDom("div","class","content_head");
        head.textContent = this.name;
        target.appendChild(head);
        const projectsDiv = createElementDom("div","class","projects_div");
        target.appendChild(projectsDiv);

        mainArr.forEach(element =>{

            if(compareAsc((todayDate()),(getDueDateComp(element.getProjectDueDate()))) == "0") {
                const projectDiv = createElementDom("div","class","project_div")
                projectsDiv.appendChild(projectDiv);

                const name = createElementDom("div","class","project_name");
                name.textContent = `${element.getProjectName()}`;
                projectDiv.appendChild(name);

                const dueDate = createElementDom("div","class","project_dueDate")
                dueDate.textContent = `${element.getProjectDueDate()}`
                projectDiv.appendChild(dueDate);

            }

        });

        return target;
    }

}

class upcoming {

    constructor(name){
        this.name = name;
    }

    getName = function(){
        return this.name;
    }

    getfunction = function(mainArr){
        const target = document.createElement("div");
        const head = createElementDom("div","class","content_head");
        head.textContent = this.name;
        target.appendChild(head);
        const projectsDiv = createElementDom("div","class","projects_div");
        target.appendChild(projectsDiv);

        mainArr.forEach(element =>{

            if(compareAsc((todayDate()),(getDueDateComp(element.getProjectDueDate()))) == "-1") {
                const projectDiv = createElementDom("div","class","project_div")
                projectsDiv.appendChild(projectDiv);

                const name = createElementDom("div","class","project_name");
                name.textContent = `${element.getProjectName()}`;
                projectDiv.appendChild(name);

                const dueDate = createElementDom("div","class","project_dueDate")
                dueDate.textContent = `${element.getProjectDueDate()}`
                projectDiv.appendChild(dueDate);

            }

        });

        return target;
    }

}

class search {

    constructor(name){
        this.name = name;
    }

    getName = function(){
        return this.name;
    }

    getfunction = function(mainArr){
        const target = document.createElement("div");
        const head = createElementDom("div","class","content_head");
        head.textContent = this.name;
        target.appendChild(head);


        return target;
    }
    
}

class addProject {

    constructor(name){
        this.name = name;

    }

    getName = function(){
        return this.name;
    }

    getfunction = function(mainArr){
        CreateProjectFnc.createProjectForm(mainArr);
    }

}

const navFnc = (function(){

    const displayNavHeading = function(head){
        const navHeading = document.querySelector("#nav_heading");
        navHeading.textContent = "";
        navHeading.textContent = `${head}`;
    }

    const displayNavLinks  = function(mainArr,...links){
        const navLinks = document.querySelector("#nav_links");
        const target = document.querySelector("#page_content");
        links.forEach((link)=>{
            const elm = createElementDom("div","class","nav_link");
            elm.textContent = `${link.getName()}`;
            elm.addEventListener("click", () => {
                target.textContent = "";
                target.appendChild(link.getfunction(mainArr));
            });
            navLinks.appendChild(elm);
        })
    }

    const displayAddProjectBtn = function(mainArr, link){

        const navLinks = document.querySelector("#nav_links");
        const target = document.querySelector("#page_content");
        const elm = createElementDom("div","class","nav_link");
        elm.textContent = `${link.getName()}`;
        elm.addEventListener("click", () => {
            target.textContent = "";
            const targetForm = createElementDom("div","id","form_content");
            const head = createElementDom("div","class","content_head");
            head.textContent = "Create New Project";
            target.appendChild(head);
            target.appendChild(targetForm);
            link.getfunction(mainArr);
        })
        navLinks.appendChild(elm);

    }
    
    return {displayNavHeading, displayAddProjectBtn ,displayNavLinks};

})();

const CreateProjectFnc = (function(){

    const createProjectForm = function(mainArr) {

        const elms = 
        `<div id="create_project_form">
            <form id="project_form" action="#gh" method="post">
                <fieldset id="fieldset_project">
                    <div class="in">
                        <label for="title" class="label">Project Name</label>
                        <input type="text" id="title" minlength="5" maxlength="25" required>
                    </div>
                    <div class="in">
                        <label for="due_date" class="label">Due Date</label>
                        <input type="date" id="due_date"  required>
                    </div>
                    <div class="in">
                        <textarea rows="5" cols="60" id="notes" placeholder = "Notes For Project"></textarea>
                    </div>
                    <span id="error" ></span>
                </fieldset>
            </form>
        </div>`;
        
        insertHtml("#form_content", elms);
        const input1 = document.querySelector("#title");
        const input2 = document.querySelector("#due_date");
        const fieldset = document.querySelector("#fieldset_project");
        const error = document.querySelector("#error");
        const btn = createElementDom("button","type","button");
        fieldset.appendChild(btn);
        btn.setAttribute("id","create_project_btn");
        btn.textContent = "Next";
        btn.addEventListener("click",() => {
            if(input1.value == ""){
                error.textContent = "Please Add a Title";
            } else if (input2.value == ""){
                error.textContent = "Please Add a Due Date";
            }    else {
                createProject(input1.value,input2.value, mainArr);
            }
        });
    }
    
    function createProject(val1, val2, mainArr){

        const arr = [];
        const prjct = new project(val1,val2, arr)
        mainArr.push(prjct);
        createTodoList(prjct);

    }
    
    function createTodoList(project) {

        const elms = 
        `<div id="create_todo_form">
            <form id="todo_form" action="#gh" method="post">
                <fieldset id="fieldset_todo">
                    <div class="in">
                        <label for="todo_item_title" class="label">Things To Do</label>
                        <input type="text" id="todo_item_title" minlength="5" maxlength="100">
                    </div>
                    <div class="in">
                        <textarea rows="5" cols="60" id="todo_item_desc" placeholder = "Description"></textarea>
                    </div>
                    <span id="error" ></span>
                </fieldset>
            </form>
        </div>`;
        const target = document.querySelector("#form_content");
        target.textContent = "";
        insertHtml("#form_content",elms);
        const input1 = document.querySelector("#todo_item_title");
        const input2 = document.querySelector("#todo_item_desc");
        const fieldset = document.querySelector("#fieldset_todo");
        const error = document.querySelector("#error");
        const btn = createElementDom("button","type","button");
        fieldset.appendChild(btn);
        btn.setAttribute("id","create_todo_btn");
        btn.textContent = "Add";
        const btn1 = createElementDom("button","type","button");
        fieldset.appendChild(btn1);
        btn1.setAttribute("id","done_btn");
        btn1.textContent = "Done";
        btn.addEventListener("click", () =>{

            if(input1.value == ""){
                error.textContent = "Please Add a thing to do";
            } else {
                const td = new todo_item(`${input1.value}`,`${input2.value}`);
                project.addItem(td);
                error.textContent = "";
                createTodoList(project);
            }

        });

        btn1.addEventListener("click", () =>{

            formMessage();

        });

    }

    function formMessage(){
        const target = document.querySelector("#page_content");
        target.textContent = "";
        const formMsg = createElementDom("div","id","form_message");
        formMsg.textContent = "The New Project Has been added to Your Projects";
        target.appendChild(formMsg);
    }
    
    return {createProjectForm};

})();

const homeFnc = function(mainArr, ...links){

    const projectContentHome = document.querySelector("#page_content");
    projectContentHome.textContent = "";
    const homeContent = createElementDom("div","id","home_content");
    projectContentHome.appendChild(homeContent);
    links.forEach((link) => {
        const navLinkContent = createElementDom("div","class","NavLinkContent");
        navLinkContent.appendChild(link.getfunction(mainArr));
        homeContent.appendChild(navLinkContent);
    })
    

};

export  {search, upcoming, today, myProject, addProject ,navFnc, homeFnc, CreateProjectFnc}