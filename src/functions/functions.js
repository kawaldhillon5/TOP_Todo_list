// import project from "../project/project";
import { isDate,format } from "date-fns";
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
    const todayFormatted = format(today, 'yyyy/MM/dd')
    return todayFormatted;

}

function getDueDateComp(date){

    let year =  date.slice(0,4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    return date =   `${year}/${month}/${day}`; 
}

function appendProject(element){

    const projectDiv = createElementDom("div","class","project_div")

    const name = createElementDom("div","class","project_name");
    name.textContent = `${element.getProjectName()}`;
    projectDiv.appendChild(name);

    const dueDate = createElementDom("div","class","project_dueDate")
    dueDate.textContent = `${element.getProjectDueDate()}`
    projectDiv.appendChild(dueDate);

    projectDiv.addEventListener("click", () =>{

        const listDiv = createElementDom("div","class","list_div");
        projectDiv.appendChild(listDiv);

        element.getProjectToDoList().forEach(elm => {
            const listItem = createElementDom("div","class","list_item");
            listDiv.appendChild(listItem);
            const listTitle = createElementDom("div", "class", "listName");
            listTitle.textContent = elm.getTitle();
            listItem.appendChild(listTitle);
            if(!(elm.getDesc() === "")){
                const listDesc = createElementDom("div","class","list_desc");
                listDesc.textContent = elm.getDesc();
                listItem.appendChild(listDesc);
            }
        });

    })

    return projectDiv;

}

export {createElementDom, insertHtml, todayDate, getDueDateComp, appendProject};