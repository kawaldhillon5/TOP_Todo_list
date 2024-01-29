import { format, isDate } from "date-fns";
import todo_item from "../todo_item/todo_item";
import project from "../project/project";


const createElementDom = function (type, attribute, attributeName){

    const elmnt = document.createElement(type);
    elmnt.setAttribute(attribute,attributeName);
    
    return elmnt;
}

function insertHtml(targetElm, Elms) {

    const target = document.querySelector(targetElm);
    target.innerHTML += Elms;
    
}

function todayDate(){

    let today = new Date();
    const todayFormatted = format(today, 'yyyy/MM/dd');
    return todayFormatted;

}

function getDueDateComp(date){

    let year =  date.slice(0,4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    return date =   `${year}/${month}/${day}`; 
}

function appendList(element,checkShow){
    const listDiv = document.querySelector(".list_div");
    listDiv.textContent = "";
    element.getProjectToDoList().forEach((elm, j) => {
        const listItem = createElementDom("div","class","list_item");
        listItem.setAttribute("id",`list_${j}`)
        listDiv.appendChild(listItem);
        const listTitle = createElementDom("input", "class", "listName");
        listTitle.setAttribute("id",`list_${j}_name`);
        listTitle.classList.add("project_input_edit");
        listTitle.setAttribute("readonly","readonly");
        listTitle.value = elm.getTitle();
        const compBtn = createElementDom("input","type","checkbox");
        compBtn.setAttribute("class","comp_checkbox");
        compBtn.setAttribute("id",`list_${j}_input`);
        if(checkShow === true){
            listItem.appendChild(compBtn);
        }
        if (elm.completed === true) {
            listItem.classList.add("item_completed");
            compBtn.setAttribute("checked","checked");
        }
        compBtn.addEventListener("change", () => {
            if(compBtn.checked){
                listItem.classList.add("item_completed");
                lStorage.deleteMyObj(element);
                elm.completed = true;
                lStorage.save(element);
            }
            else{
                listItem.classList.remove("item_completed");
                lStorage.deleteMyObj(element);
                elm.completed = false;
                lStorage.save(element);
            }
        });
        listItem.appendChild(listTitle);
        if(!(elm.getDesc() === "")){
            const listDesc = createElementDom("input","class","list_desc");
            listDesc.setAttribute("id",`list_${j}_desc`);
            listDesc.classList.add("project_input_edit");
            listDesc.setAttribute("readonly","readonly");
            listDesc.value = elm.getDesc();
            listItem.appendChild(listDesc);
        }
    });
    return listDiv;
}


const formMessage = function(container, element){
    lStorage.save(element);
    const target = document.querySelector(container);
    target.textContent = "";
    
}

function createToDoForm(project, container, func, checkShow) {
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
    const target = document.querySelector(container);
    target.textContent = "";
    insertHtml(container,elms);
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
            appendList(project, checkShow);
            lStorage.deleteMyObj(project);
            createToDoForm(project,container,func, checkShow);
        }

    });

    btn1.addEventListener("click", () =>{
        func();
    });
}

function appendProject(element , mainArr, i){

    const projectDiv = createElementDom("div","class","project_div")
    const name = createElementDom("div","class","project_name");
    name.textContent = `${element.getProjectName()}`;
    projectDiv.appendChild(name);

    const dueDate = createElementDom("div","class","project_dueDate")
    dueDate.textContent = `${element.getProjectDueDate()}`;
    projectDiv.appendChild(dueDate);
       
    projectDiv.addEventListener("click", () => {displayProject(element, mainArr , i, "#page_content", true)});

    return projectDiv;

}

function displayProject(element, mainArr, i, container, checkShow) {
    const page = document.querySelector(container);
    page.textContent = "";
    const projectDiv = createElementDom("div","class","project_div_full")
    page.appendChild(projectDiv);
    const name = createElementDom("input","class","project_name_full");
    name.setAttribute("id",`project_${i}_name`);
    name.classList.add("project_input_edit");
    name.setAttribute("readonly","readonly");
    name.value = `${element.getProjectName()}`;
    projectDiv.appendChild(name);
    const dueDate = createElementDom("input","class","project_dueDate_full")
    dueDate.classList.add("project_input_edit");
    dueDate.setAttribute("id",`project_${i}_dueDate`);
    dueDate.setAttribute("readonly","readonly");
    dueDate.value = `${element.getProjectDueDate()}`;
    projectDiv.appendChild(dueDate);
    const notes = createElementDom("input","class",'project_notes_full');
    notes.setAttribute("id",`project_${i}_notes`);
    notes.classList.add("project_input_edit");
    notes.setAttribute("readonly","readonly");
    if(!(element.getProjectNotes() == "")) {
        notes.value = element.getProjectNotes();
        projectDiv.appendChild(notes);
    }
    const addTodo = createElementDom("button","class","add_todo");
    addTodo.textContent = "+";
    const edit = createElementDom("button","class","edit_btn");
    edit.textContent = "Edit";
    const deleteProject = createElementDom("button","class","delete_btn");
    deleteProject.textContent = 'Delete';
    const btnsDiv = createElementDom("div","id","btns_div")
    projectDiv.appendChild(btnsDiv);
    btnsDiv.textContent = "..."
    const btnDiv = createElementDom("div","class", "btn_div");
    btnDiv.classList.add("non_active");
    btnsDiv.appendChild(btnDiv);
    btnDiv.appendChild(addTodo);
    btnDiv.appendChild(edit);
    btnDiv.appendChild(deleteProject);
    const listDiv = createElementDom("div","class","list_div");
    projectDiv.appendChild(listDiv);
    const confirmDiv = createElementDom("dialog","id","confirm_dia");
    btnDiv.appendChild(confirmDiv);
    const diaText = createElementDom("p","class","dia_text");
    diaText.textContent = "Delete this Project ?";
    const diaYes = createElementDom("button","id","dia_yes");
    diaYes.textContent = "Yes";
    const diaNo = createElementDom("button","id","dia_no");
    diaNo.textContent = "No";
    confirmDiv.appendChild(diaText);
    confirmDiv.appendChild(diaYes);
    confirmDiv.appendChild(diaNo);
    appendList(element, checkShow);
    const errorDiv = createElementDom("div","id","error_msg");
    projectDiv.appendChild(errorDiv);
    const formTarget = createElementDom("div","id","todo_form_target");
    projectDiv.appendChild(formTarget);
    let btnsDivState = true;

    btnsDiv.addEventListener("click", () => {
        if(btnsDivState === true){
            if(btnDiv.classList.contains("non_active")){
                btnDiv.classList.remove("non_active");
                btnDiv.classList.add("active");
            } else {
                btnDiv.classList.add("non_active");
                btnDiv.classList.remove("active");
            }
        } else if(btnsDivState === false) {
            btnsDiv.innerText = "...";
            btnsDiv.appendChild(btnDiv);
            btnsDivState = true;
            const listArr = document.querySelectorAll(".list_item");
            listArr.forEach((elm,j) =>{
                const btn = document.querySelector(".item_delete_btn");
                elm.removeChild(btn);
            });
            edit.classList.remove("active");
            const arr = document.querySelectorAll(".project_input_edit");
            arr.forEach((con) => {
                con.setAttribute("readonly","readonly");
            });
            errorDiv.textContent = "";
            const nameEdit = document.querySelector(`#project_${i}_name`);
            const dueDateEdit = document.querySelector(`#project_${i}_dueDate`);
            if(nameEdit.value === ""){
                nameEdit.value = element.name;
                errorDiv.textContent = "Title is not Valid";
            } else {
                element.name = nameEdit.value;
            }
            if((dueDateEdit.value === "") || (getDueDateComp(dueDateEdit.value) < todayDate())){
                dueDateEdit.value = element.dueDate;
                errorDiv.textContent = "Due date is not Valid";
            } else {
                element.dueDate = dueDateEdit.value;
            }
            const notesEdit = document.querySelector(`#project_${i}_notes`);
            if(!(notesEdit === null)){
                element.notes =  notesEdit.value
                if (notesEdit.value === "") {projectDiv.removeChild(notesEdit);}
            }
            element.getProjectToDoList().forEach((elmEdit,j) => {

                const titleEdit = document.querySelector(`#list_${j}_name`);
                const descEdit = document.querySelector(`#list_${j}_desc`);
                if(!(titleEdit === null)){
                    if(titleEdit.value === ""){
                        titleEdit.value = elmEdit.title;
                        errorDiv.textContent = "Item Title cannot be Empty";
                    }
                    elmEdit.title = titleEdit.value;
                }
                if(!(descEdit === null)) {
                    if (descEdit.value === "") {
                        const listItem = document.querySelector(`#list_${i}`)
                        listItem.removeChild(descEdit);
                        elmEdit.desc ="";
                    } else {
                        elmEdit.desc = descEdit.value;
                    }
                }
            });
            lStorage.save(element);
        }
    });

    addTodo.addEventListener("click",(e) =>{
        e.stopPropagation();
        btnDiv.classList.add("non_active");
        btnDiv.classList.remove("active");
        createToDoForm(element,"#todo_form_target",function(){formMessage("#todo_form_target", element), true});
       
    });

    edit.addEventListener("click", (e) => {
        e.stopPropagation();
        btnDiv.classList.add("non_active");
        btnDiv.classList.remove("active");
        edit.classList.add("active");
        btnsDiv.textContent  = "Save";
        btnsDivState = false;
        btnsDiv.appendChild(btnDiv);
        const todo_form = document.querySelector("#todo_form_target");
        todo_form.textContent = "";
        const arr = document.querySelectorAll(".project_input_edit");
        arr.forEach((con) => {
            con.removeAttribute("readonly");
        });
        const listArr = document.querySelectorAll(".list_item");
        listArr.forEach((elm,j) =>{
            const itemDeleteBtn = createElementDom("button","class","item_delete_btn");
            itemDeleteBtn.textContent = "Delete"; 
            itemDeleteBtn.addEventListener("click", () =>{
                const item = document.querySelector(`#list_${j}`);
                const prjctArr = element.getProjectToDoList();
                listDiv.removeChild(item);
                prjctArr.splice(prjctArr[j],1);
                lStorage.save(element);
            });
            elm.appendChild(itemDeleteBtn);
        });
    });

    deleteProject.addEventListener("click", (e) =>{
        e.stopPropagation();
        confirmDiv.showModal()

        diaYes.addEventListener("click", () =>{
            confirmDiv.close();
            lStorage.deleteMyObj(element);
            mainArr.deleteArrElm(element);
            page.textContent = "Project deleted";
        });

        diaNo.addEventListener("click",() =>{confirmDiv.close()});

    });

}

const lStorage = (function(){

    const save = function(prjct){
        const myObj = JSON.stringify(prjct);
        localStorage.setItem(`${prjct.id}`,myObj);
    }

    const load = function(){
        let array = [];
        for (let i = 1; i < localStorage.length; i++) {
            if(!(localStorage.key(i) == "")){
                const myObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                let todoArr = [];
                myObj.arr.forEach((item, i )=> {todoArr[i] = new todo_item(item.title, item.desc, item.completed)});
                array[i] = new project(myObj.name, myObj.projectDueDate, myObj.notes, todoArr);
            }
        }
        return array;
    }

    const deleteMyObj = function(prjct){
        localStorage.removeItem(`${prjct.id}`);
    } 

    return {save, load, deleteMyObj};

})();


export {createElementDom, insertHtml, todayDate, getDueDateComp, appendProject, lStorage, createToDoForm};