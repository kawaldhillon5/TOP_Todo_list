import project from "../project/project";

const createElementDom = function (type, attribute, attributeName){

    const elmnt = document.createElement(type);
    elmnt.setAttribute(attribute,attributeName);
    
    return elmnt;
}

const createProjectForm = function(mainArr) {

    let arr = [];
    let prjct;
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
    
    insertHtml("#content", elms);
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
            console.log(mainArr);
        }
    });
}

function createProject(val1, val2, arr,mainArr){
    const prjct = new project(val1,val2, arr)
    mainArr.push(prjct);
} 

function insertHtml(targetElm, Elms) {

    const target = document.querySelector(targetElm);
    target.innerHTML += Elms;
    
}

export {createElementDom, createProjectForm, insertHtml};