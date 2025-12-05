import home from "../pages/home.js";
import browse from "../pages/browse.js";
import login from "../pages/login.js";
import createRecipe from "../pages/createRecipe.js";
import yourRecipe from "../pages/yourRecipe.js";

import $ from "jquery";

export function loadPage(page){
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

     if (page === "yourRecipe"){
    
      $("#app").html(yourRecipe);
     }
} 