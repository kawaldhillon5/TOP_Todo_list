import { createElementDom, insertHtml, todayDate,getDueDateComp} from "../functions/functions";
import project from "../project/project";
import todo_item from "../todo_item/todo_item";
import {search, upcoming, today, myProject} from "../link_functions/link";
import { isDate, compareAsc, formatDistanceStrict } from "date-fns";

const Main = (function(){
    
    let projectArr = [];
    let navHead = "Home";
    let selected;
    const link1 = new myProject("My Project") 
    const link2 = new today("Today") 
    const link3 =  new upcoming("Upcoming") 
    const link4 = new search("Search");

    const run = function(){

        navFnc.displayNavHeading(navHead);
        navFnc.displayNavLinks(projectArr, link1,link2,link4,link3);
        const addButton = document.querySelector("#add_btn")
        addButton.addEventListener("click", () =>{CreateProjectFnc.createProjectForm(projectArr);});
        homeFnc(projectArr,link2,link3);
        const home = document.querySelector("#nav_heading");
        home.addEventListener("click", () => homeFnc(projectArr, link2, link3));
    }

    return {run};

})();

const navFnc = (function(){

    const displayNavHeading = function(head){
        const navHeading = document.querySelector("#nav_heading");
        navHeading.textContent = "";
        navHeading.textContent = `${head}`;
    }

    const displayNavLinks  = function(mainArr,...links){
        const navLinks = document.querySelector("#nav_links");
        navLinks.textContent = "";
        const target = document.querySelector("#page_content");
        links.forEach((link)=>{
            const elm = createElementDom("div","class","nav_link");
            elm.textContent = `${link.getName()}`;
            elm.addEventListener("click", () => {
                target.textContent = "";
                target.appendChild(link.getfunction(mainArr))
            });
            navLinks.appendChild(elm);
        })
    }
    
    return {displayNavHeading, displayNavLinks};

})();

const CreateProjectFnc = (function(){

    const createProjectForm = function(mainArr) {

        clearForm();
        let arr = [];
        const elms = 
        `<div id="create_project_form">
            <form id="project_form" action="#gh" method="post">
                <fieldset id="fieldset_project">
                    <legend>Create New Project</legend>
                    <div class="in">
                        <label for="title" class="label">Project Name</label>
                        <input type="text" id="title" minlength="5" maxlength="25" required>
                    </div>
                    <div class="in">
                        <label for="due_date" class="label">Due Date</label>
                        <input type="date" id="due_date"  required>
                    </div>
                    <div class="in">
                        <textarea rows="5" cols="60" id=""notes placeholder = "Notes For Project"></textarea>
                    </div>
                    <span id="error" ></span>
                </fieldset>
            </form>
        </div>`;
        
        insertHtml("#page_content", elms);
        const input1 = document.querySelector("#title");
        const input2 = document.querySelector("#due_date");
        const fieldset = document.querySelector("#fieldset_project");
        const error = document.querySelector("#error");
        const btn = createElementDom("button","type","button");
        fieldset.appendChild(btn);
        btn.setAttribute("id","create_project_btn");
        btn.textContent = "Create";
        btn.addEventListener("click",() => {
            if(input1.value == ""){
                error.textContent = "Please Add a Title";
            } else if (input2.value == ""){
                error.textContent = "Please Add a Due Date";
            }    else {
                createProject(input1.value,input2.value,arr,mainArr);
                clearForm();
            }
        });
    }
    
    function createProject(val1, val2, arr,mainArr){
        const prjct = new project(val1,val2, arr)
        mainArr.push(prjct);
    } 
    
    function clearForm() {
    
        const form  = document.querySelector("#page_content");
        form.textContent = "";
    
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

export default Main;