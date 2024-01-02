import project from "../project/project";
import { createElementDom, todayDate, getDueDateComp } from "../functions/functions";
import { compareAsc } from "date-fns";


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
            
            const projectDiv = createElementDom("div","class","project_div")
            projectsDiv.appendChild(projectDiv);

            const name = createElementDom("div","class","project_name");
            name.textContent = `${element.getProjectName()}`;
            projectDiv.appendChild(name);

            const dueDate = createElementDom("div","class","project_dueDate")
            dueDate.textContent = `${element.getProjectDueDate()}`
            projectDiv.appendChild(dueDate);
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

export  {search, upcoming, today, myProject}