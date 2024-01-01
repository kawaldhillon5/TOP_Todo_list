import project from "../project/project";
import { createElementDom } from "../functions/functions";

class myProject {

    constructor(name) {
        this.name = name;
    }

    getName = function(){
        return this.name;
    }

    getfunction = function(mainArr){

        const target = document.createElement("div");

        mainArr.forEach(element => {
            
            const projectDiv = createElementDom("div","class","project_div")
            target.appendChild(projectDiv);

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
        const target = document.createElement("#div");

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
        const target = document.createElement("#div");

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
        const target = document.createElement("#div");

        return target;
    }
    
}

export  {search, upcoming, today, myProject}