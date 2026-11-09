// ============================================================
// AUTH.JS - FIREBASE ADMIN AUTHENTICATION
// ============================================================

const ADMIN_EMAIL = "aminulislamiba@gmail.com";
const ADMIN_UID = "pyP601yMn3Rs1n8fth0bGHyzE8f2";

// ============================================================
// LOGIN
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const passwordElement =
            document.getElementById("adminPassword");

        const message =
            document.getElementById("loginMessage");

        const password = passwordElement.value;

        if (!password) {
            message.textContent = "Please enter your password.";
            return;
        }

        message.textContent = "Logging in...";

        try {

            const result =
                await auth.signInWithEmailAndPassword(
                    ADMIN_EMAIL,
                    password
                );

            if (result.user.uid !== ADMIN_UID) {
                await auth.signOut();
                throw new Error("Unauthorized account.");
            }

            localStorage.setItem("adminLogin", "true");

            window.location.href = "dashboard.html";

        } catch (error) {

            console.error("Login error:", error);

            message.textContent =
                "Login failed. Check your password and Firebase setup.";

        }

    });

});


// ============================================================
// CHECK ADMIN LOGIN
// ============================================================

function checkLogin() {

    auth.onAuthStateChanged(async function (user) {

        if (!user || user.uid !== ADMIN_UID) {

            if (user) {
                await auth.signOut();
            }

            window.location.href = "admin.html";
        }

    });

}


// ============================================================
// LOGOUT
// ============================================================

async function logout() {

    try {

        await auth.signOut();

        localStorage.removeItem("adminLogin");

        window.location.href = "admin.html";

    } catch (error) {

        console.error("Logout error:", error);

        alert("Logout failed. Please try again.");

    }

}