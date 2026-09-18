const loginForm =
    document.getElementById(
        "loginForm"
    );


const registerForm =
    document.getElementById(
        "registerForm"
    );


const message =
    document.getElementById(
        "message"
    );


// Show message
function showMessage(
    text,
    type
) {

    message.textContent = text;

    message.className =
        `message ${type}`;

}


// ============================
// LOGIN
// ============================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            showMessage(
                "Logging in...",
                "info"
            );


            const email =
                document.getElementById(
                    "email"
                ).value;


            const password =
                document.getElementById(
                    "password"
                ).value;


            try {

                const response =
                    await fetch(
                        "/api/auth/login",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    email:
                                        email,

                                    password:
                                        password

                                })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    showMessage(
                        data.message,
                        "error"
                    );

                    return;

                }


                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        data.user
                    )
                );


                showMessage(
                    "Login successful!",
                    "success"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "dashboard.html";

                    },
                    500
                );


            } catch (error) {

                console.error(error);

                showMessage(
                    "Network error. Please try again.",
                    "error"
                );

            }

        }
    );

}


// ============================
// REGISTER
// ============================

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            showMessage(
                "Creating account...",
                "info"
            );


            const name =
                document.getElementById(
                    "name"
                ).value;


            const email =
                document.getElementById(
                    "email"
                ).value;


            const password =
                document.getElementById(
                    "password"
                ).value;


            try {

                const response =
                    await fetch(
                        "/api/auth/register",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    name,
                                    email,
                                    password

                                })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    showMessage(
                        data.message,
                        "error"
                    );

                    return;

                }


                showMessage(
                    "Registration successful!",
                    "success"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "login.html";

                    },
                    1000
                );


            } catch (error) {

                console.error(error);

                showMessage(
                    "Network error. Please try again.",
                    "error"
                );

            }

        }
    );

}