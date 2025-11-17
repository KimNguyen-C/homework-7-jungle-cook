import home from "../pages/home.js";
import browse from "../pages/browse.js";
import login from "../pages/login.js";
import createRecipe from "../pages/createRecipe.js";
import $ from "jquery";

export function loadPage(page){
     // Scroll to top when loading new page
     window.scrollTo(0, 0);
     
     if (page === "home"){
    //   document.querySelector("#app").innerHTML = home;
      $("#app").html(home);
     }

     if (page === "browse"){
      document.querySelector("#app").innerHTML = browse;
      
     }

     if (page === "login"){
    //   document.querySelector("#app").innerHTML = home;
      $("#app").html(login);
     }

     if (page === "createRecipe"){
    //   document.querySelector("#app").innerHTML = home;
      $("#app").html(createRecipe);
     }
} 