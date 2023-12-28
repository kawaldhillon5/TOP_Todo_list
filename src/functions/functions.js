import project from "../project/project";

const createElementDom = function (type, attribute, attributeName){

    const elmnt = document.createElement(type);
    elmnt.setAttribute(attribute,attributeName);
    
    return elmnt;
}

const createProject = function() {

    let arr = [];
    const createMain = createElementDom("div", "id", "create_project_main");
    const createForm = createElementDom("form","action","gh");
    createForm.setAttribute("method","post");
    createMain.appendChild(createForm);
    const createFieldset = document.createElement("fieldset");
    createForm.appendChild(createFieldset);
    const mainText = document.createElement("legend");
    mainText.textContent = "New Project";
    createForm.appendChild(mainText);
    const in1Div = document.createElement("div");
    const label1 = createElementDom("label","for","project_name");
    label1.textContent = "Project Name";
    const input1 = createElementDom("input","id","project_name");
    input1.setAttribute("type","text");
    createForm.appendChild(in1Div);
    in1Div.appendChild(label1);
    in1Div.appendChild(input1);
    const in2Div = document.createElement("div");
    const label2 = createElementDom("labe2","for","project_DueDate");
    label2.textContent = "Due Date";
    const input2 = createElementDom("input","id","project_name");
    input2.setAttribute("type","date");
    createForm.appendChild(in2Div);
    in2Div.appendChild(label2);
    in2Div.appendChild(input2);
    const btn = createElementDom("button","type","button");
    createForm.appendChild(btn);
    btn.addEventListener("click",() => {

        const prjct = new project(`${input1.value}`,`${input2.value}`,arr)
        console.log(prjct);
    })

    return createMain;

}

export {createElementDom, createProject};