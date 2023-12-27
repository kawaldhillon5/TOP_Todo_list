class todo_item {
    constructor(projectName,title, activity, dueDate, priority, notes){
        this.projectName = projectName;
        this.title = title;
        this.activity = activity;
        this.dueDate = dueDate;
        this.notes = notes;
        this.priority = priority;
    }
};

export default todo_item;