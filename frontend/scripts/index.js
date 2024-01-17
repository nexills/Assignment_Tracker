
function login() {
    if ($('#loginEmail').val() === "" || $('#loginPassword').val() === "") {
        $('#result').text("Some fields are empty");
        return;
    }
    try {
        fetch("http://localhost:9000/user/login?email=" + $('#loginEmail').val() +
        "&password=" + $('#loginPassword').val())
        .then((response)=> {
            if (response.status === 500) {
                $('#result').text("Server Error: Login failed");
                throw new Error("Server error");
            }
            return response.json();
        })
        .then((response)=> {
            if (jQuery.isEmptyObject(response)) {
                // failed login attempt
                $('#result').text("Login failed");
            } else {
                // logged in successfully
                window.sessionStorage.setItem("AsTrackerDetails_id", response[0].user_id);
                window.sessionStorage.setItem("AsTrackerDetails_mail", response[0].email);
                $('#result').text("Logging you in");
                window.setTimeout(()=> {
                    window.location = './dashboard.html';
                }, 1200);
            }
        })
    } catch (error) {
        $('#result').text("Server error");
        console.log(error);
    }
}

function register() {
    if ($('#registerEmail').val() === "" || $('#registerPassword').val() === "") {
        $('#result').text("Some fields are empty");
        return;
    }
    try {
        fetch("http://localhost:9000/user/create?email="+ $('#registerEmail').val() +
        "&password=" + $('#registerPassword').val(),
        {method: "POST"})
        .then((response)=> {
            if (response.ok) {
                return response.json();
            } else {
                // failed
                if (response.status === 500) {
                    $('#result').text("Server Error: Register failed");
                    throw new Error("Server error");
                }
            }
        })
        .then((response)=> {
            window.sessionStorage.setItem("AsTrackerDetails_id", response.user_id);
            window.sessionStorage.setItem("AsTrackerDetails_mail", response.email)
            window.setTimeout(()=> {
                window.location = './dashboard.html';
            }, 500);
        })
    } catch (error) {
        console.log(error);
    }
}