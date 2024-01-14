import "./todo_item.css"

class todo_item {
    constructor(title, desc){
        this.title = title;
        this.desc = desc;
    }

    getTitle (){
        return this.title;
    }

    getDesc() {
        return this.desc;
    }
};

export default todo_item;