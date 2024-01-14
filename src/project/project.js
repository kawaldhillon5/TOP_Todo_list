import "./project.css";

class project {
    constructor(name,projectDueDate,notes,arr){
        this.name = name;
        this.projectDueDate = projectDueDate;
        this.notes = notes;
        this.arr = arr;
        
    }
    addItem = function(Todo_item){
        this.arr.push(Todo_item);
    }

    getProjectName = function(){
        return this.name;
    }

    getProjectNotes(){
        return this.notes;
    }

    getProjectDueDate = function(){
        return this.projectDueDate;
    }

    getProjectToDoList = function(){
        return this.arr;
    }

}





export default project;