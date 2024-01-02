import project from "../project/project";
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

export {createElementDom, insertHtml, todayDate, getDueDateComp};