
function get() {
    try {
        fetch("http://localhost:9000/assignment/get?user=" +
        window.sessionStorage.getItem("AsTrackerDetails_id"))
        .then((promise)=> {
            return promise.json();
        })
        .then((promise)=> {
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
            .then(()=> {
                $('#result').text("Sent successfully");
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
    if(!jQuery.isEmptyObject(user_email)) {
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

function add() {
    // add a new assignment
    $("#assignment_editor").empty();
    $('#assignment_editor').append("<table><tr><td>Course</td><td><input id=\"course\"></input></td>"+
        "</tr><tr><td>Title</td><td><input id=\"title\"></input></td></tr><tr>" + 
        "<td>Due Day</td><td><input id=\"day\"></input></td></tr><tr><td>Due Month</td>" +
        "<td><input id=\"month\"></input></td></tr><tr><td>Due Year</td><td>" + 
        "<input id=\"year\"></input></td></tr></table>");
    $("#year").val(new Date().getFullYear());
    $("#assignment_editor").append("<button onClick=\"post()\">Add</button>");
}

function post() {
    // post a new assignment
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
    // post
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
    .then(()=> {
        // reset the editor
        $("assignment_editor").empty();
        $("assignment_editor").append("<button onclick=\"add()\">Add a new assignment</button>");
        get();
    })
}

function deleteAccount() {
    $("#deleteAcc").empty();
    $("#deleteAcc").append("<label>Re-enter Password </label><input id=\"pass\"></input><br>" + 
    "<button onClick=\"deleteConfirm()\">Confirm</button>");
}

function deleteConfirm() {
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