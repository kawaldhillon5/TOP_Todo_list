
import {search, upcoming, today, myProject, addProject ,navFnc, homeFnc, ProjectArr, } from "../link_functions/link";
import { lStorage } from "../functions/functions";


const Main = (function(){
    const arr = lStorage.load();
    const projectArr = new ProjectArr(arr);
    let navHead = "Home";
    const link0 = new addProject("Add Project");
    const link1 = new myProject("My Projects") 
    const link2 = new today("Today") 
    const link3 =  new upcoming("Upcoming") 
    const link4 = new search("Search");

    const run = function(){

        navFnc.displayNavHeading(navHead);
        navFnc.displayAddProjectBtn(projectArr,link0);
        navFnc.displayNavLinks(projectArr, link1,link2,link4,link3);
        homeFnc(projectArr,link2,link3);
        const home = document.querySelector("#nav_heading");
        home.addEventListener("click", () => homeFnc(projectArr, link2, link3));
    }

    return {run};

})();

export default Main;