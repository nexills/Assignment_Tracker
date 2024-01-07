
function get() {
    try {
        fetch("http://localhost:9000/assignment/get?user=" +
        window.sessionStorage.getItem("AsTrackerDetails_id"))
        .then((promise)=> {
            console.log(promise);
            return promise.json();
        })
        .then((promise)=> {
            console.log(promise);
            $("#assignment_list").empty();
            if (jQuery.isEmptyObject(promise)) {
                var text = "You have no upcoming assignments";
            } else {
                // display in table
                var text = "<tr><th>Title</th><th>Course</th><th>Due Date</th>"+
                "<th>Delete</th></tr>";
                for (var i = 0; i < promise.length; i++) {
                    text += "<tr><td>" + promise[i].title + "</td>";
                    text += "<td>" + promise[i].course_id + "</td>";
                    text += "<td>" + promise[i].due_day + "/" + promise[i].due_month +
                    "/" + promise[i].due_year + "</td>";
                    text += "<td><button class=\"deletebutton\" id=\"assignment" + promise[i].assignment_id +
                    "\">Delete</button></td>";
                    text += "</tr>";
                }
            }
            $("#assignment_list").append(text);
        })
    } catch {
        $("#result").text("Server Error");
        console.log(error);
    }
}

// handle delete button click for each assignment
$(document).ready(function() {
    $("#assignment_list").on( "click", ".deletebutton", function() {
        console.log("activated");
        var id = $(this).attr('id');
        id = id.slice(10);
        fetch("http://localhost:9000/assignment/delete?id=" + id.toString(),
        {method: "DELETE"})
        .then(()=> {
            get();
        });
      } );

});

function email() {        
    fetch("http://localhost:9000/assignment/get?user=" +
    window.sessionStorage.getItem("AsTrackerDetails_id"))
    .then((promise)=> {
        console.log(promise);
        return promise.json();
    })
    .then((promise)=> {
        if (jQuery.isEmptyObject(promise)) {
            $("#result").text("You have no assignments due; cannot send email");
        } else {
            tasklist = "";
            for (var i = 0; i < promise.length; i++) {
                tasklist += promise[i].title + " from " + promise[i].course_id;
                tasklist += " due at " + promise[i].due_day + "/" + promise[i].due_month +
                "/" + promise[i].due_year + "\n";
            }
            emailjs.init('Hz1hUbv2AsVOGy-dQ');
            emailjs.send("service_o0a8ubd","template_dvt5tbh",{
                task: tasklist,
                email: window.sessionStorage.getItem("AsTrackerDetails_mail"),
                })
            .then((response)=> {
                console.log(response);
            })
            .catch((error)=> {
                console.log(error);
            })
        }
    })
}

function logout() {
    window.setTimeout(()=> {
        window.sessionStorage.removeItem("AsTrackerDetails_mail");
        window.sessionStorage.removeItem("AsTrackerDetails_id");
        window.location = './index.html';
    }, 1500)
}

function onLoad() {
    var user_email = window.sessionStorage.getItem("AsTrackerDetails_mail");
    console.log(user_email);
    if(jQuery.isEmptyObject(user_email)) {
        $("body").empty();
        $("body").append("<p>You are not logged in</p>");
        $("body").append("<button onClick=\"logout()\">Return to login page</button>");
        return;
    } else {
        $("#welcome").text("Welcome, " + user_email);
        get();
    }
    // default values for inputs
    $("#year").val(new Date().getFullYear());
}


function post() {
    var user_id = window.sessionStorage.getItem("AsTrackerDetails_id");
    try {
        if ($("#course").val() == "" || $("#title").val() == "" ||
        $("#day").val() == "" || $("#month").val() == "" || $("#year").val() == "") {
            throw "empty fields";
        }
        var day = parseInt($("#day").val());
        var month = parseInt($("#month").val());
        var year = parseInt($("#year").val());
        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2000) {
            throw "input out of bound";
        }
    } catch (error) {
        $("#result").text("Invalid input");
        console.log(error);
        return;
    }
    fetch("http://localhost:9000/assignment/post",
    {method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"user_id": user_id, "title": $("#title").val(),
    "course_id": $("#course").val(), "due_day": day, "due_month": month,
    "due_year": year})})
    .then((promise)=> {
        return promise.json();
    })
    .then((promise)=> {
        console.log(promise);
        $("#day").val("");
        $("#month").val("");
        $("#year").val(new Date().getFullYear());
        $("#title").val("");
        $("#course").val("");
        get();
    })
}

function deleteAccount() {
    fetch("http://localhost:9000/user/delete?email=" + 
    window.sessionStorage.getItem("AsTrackerDetails_mail") + "&password=" +
    $("#pass").val(),
    {method: "DELETE"})
    .then((response)=> {
        if (response.ok) {
            $("#result").text("Account deleted, logging you out...");
            logout()
        }
    })
}