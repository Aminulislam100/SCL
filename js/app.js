// Main Website JavaScript


// Theme Toggle Function

function changeTheme(theme){


    document.documentElement.setAttribute(
        "data-theme",
        theme
    );


    localStorage.setItem(
        "theme",
        theme
    );


}





// Load Saved Theme


let savedTheme = localStorage.getItem("theme");


if(savedTheme){


    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );


}





// Mobile Menu Helper


function toggleMenu(){


    let menu =
    document.getElementById("mobileMenu");


    if(menu){


        menu.classList.toggle("hidden");


    }


}





// Current Year Footer


let yearElements =
document.querySelectorAll(".currentYear");


yearElements.forEach(element=>{


    element.innerText =
    new Date().getFullYear();


});