import project from "../project/project";
import { createElementDom, todayDate, getDueDateComp, insertHtml, appendProject, lStorage, createToDoForm } from "../functions/functions";
import { compareAsc } from "date-fns";

class ProjectArr {
    constructor(arr) {
        this.arr = arr;
    }

    getArr(){
        return this.arr;
    }

    addElmArr(elm){
        this.arr.push(elm);
    }

    deleteArrElm(elm){
        this.arr.splice(this.arr.indexOf(elm),1);
    }

}

class myProject {

    constructor(name) {
        this.name = name;
    }

    getName = function(){
        return this.name;
    }

    getfunction = function(mainArr){

        const target = document.createElement("div");
        target.setAttribute("id","my_projects_div");
        const head = createElementDom("div","class","content_head");
        head.textContent = this.name;
        target.appendChild(head);
        const projectsDiv = createElementDom("div","class","projects_div");
        target.appendChild(projectsDiv);

        mainArr.getArr().forEach((element,i) => {
            projectsDiv.appendChild(appendProject(element, mainArr, i));

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

        mainArr.getArr().forEach((element,i) =>{

            if(compareAsc((todayDate()),(getDueDateComp(element.getProjectDueDate()))) == "0") {

                projectsDiv.appendChild(appendProject(element, mainArr, i));

                // const projectDiv = createElementDom("div","class","project_div")
                // projectsDiv.appendChild(projectDiv);

                // const name = createElementDom("div","class","project_name");
                // name.textContent = `${element.getProjectName()}`;
                // projectDiv.appendChild(name);

                // const dueDate = createElementDom("div","class","project_dueDate")
                // dueDate.textContent = `${element.getProjectDueDate()}`
                // projectDiv.appendChild(dueDate);

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

        mainArr.getArr().forEach((element,i) =>{

            if(compareAsc((todayDate()),(getDueDateComp(element.getProjectDueDate()))) == "-1") {

                projectsDiv.appendChild(appendProject(element, mainArr, i));
                // const projectDiv = createElementDom("div","class","project_div")
                // projectsDiv.appendChild(projectDiv);

                // const name = createElementDom("div","class","project_name");
                // name.textContent = `${element.getProjectName()}`;
                // projectDiv.appendChild(name);

                // const dueDate = createElementDom("div","class","project_dueDate")
                // dueDate.textContent = `${element.getProjectDueDate()}`
                // projectDiv.appendChild(dueDate);

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
        const input3 = document.querySelector("#notes");
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
                createProject(input1.value,input2.value, input3.value, mainArr);
            }
        });
    }
    
    function createProject(val1, val2, val3, mainArr){

        const arr = [];
        const prjct = new project(val1,val2, val3,  arr)
        mainArr.addElmArr(prjct);
        const formDiv = document.querySelector("#form_content");
        formDiv.textContent = "";
        const projectName = createElementDom("div","class","project_name");
        projectName.textContent = val1;
        formDiv.appendChild(projectName);
        const listDiv = createElementDom("div","class","list_div")
        formDiv.appendChild(listDiv);
        const todo_from_target = createElementDom("div","id","todo_form_target");
        formDiv.appendChild(todo_from_target);
        createTodoList(prjct, "#todo_form_target");
    }
    
    function createTodoList(project, container) {

        createToDoForm(project,container, function(){formMessage(container, project)});
        
    }

    function formMessage(container,prjct){
        lStorage.save(prjct);
        const target = document.querySelector(container);
        target.textContent = "";
    }
    
    return {createProjectForm, createTodoList};

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

export  {search, upcoming, today, myProject, addProject, ProjectArr ,navFnc, homeFnc, CreateProjectFnc}