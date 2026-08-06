const ADMIN_PASSWORD = "44881212";


// Login System

const loginForm = document.getElementById("loginForm");


if (loginForm) {


    loginForm.addEventListener("submit", function(e) {


        e.preventDefault();



        let password = document.getElementById("adminPassword").value;


        let message = document.getElementById("loginMessage");



        if (password === ADMIN_PASSWORD) {


            localStorage.setItem(
                "adminLogin",
                "true"
            );


            message.innerHTML = `

            <div class="alert alert-success">

            Login Successful. Redirecting...

            </div>

            `;



            setTimeout(() => {


                window.location.href = "dashboard.html";


            }, 1000);



        }

        else {


            message.innerHTML = `

            <div class="alert alert-error">

            Incorrect Password

            </div>

            `;


        }



    });


}



// Protect Dashboard

function checkLogin() {


    if (
        localStorage.getItem("adminLogin") !== "true"
    ) {


        window.location.href = "admin.html";


    }


}



// Logout

function logout() {


    localStorage.removeItem(
        "adminLogin"
    );


    window.location.href = "admin.html";


}