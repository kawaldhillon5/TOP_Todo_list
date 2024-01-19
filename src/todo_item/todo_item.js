import "./todo_item.css"

class todo_item {
    constructor(title, desc, completed){
        this.title = title;
        this.desc = desc;
        this.completed = typeof completed !== 'undefined' ? completed : false;
    }

    getTitle (){
        return this.title;
    }

    getDesc() {
        return this.desc;
    }
};

export default todo_item;