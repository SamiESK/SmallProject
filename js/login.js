$(document).ready(function () {
    $("#signup").click(function () {
        $("#first").fadeOut("fast", function () {
            $("#second").fadeIn("fast");
            document.title = 'Sign Up' + TITLE_STR;
        });
    });

    $("#signin").click(function () {
        $("#second").fadeOut("fast", function () {
            $("#first").fadeIn("fast");
            document.title = 'Login' + TITLE_STR;
        });
    });

    $(function () {
        $("form[name='login']").validate({
            rules: {
                username: {
                    required: true,
                },
                password: {
                    required: true,
                },
            },
            messages: {
                username: "Please enter a valid email address",

                password: {
                    required: "Please enter password",
                },
            },
            submitHandler: function (form) {

                userID = 0;
                firstName = "";
                lastName = "";

                let login = $("#username").val();
                let password = $("#password").val();
                	var hash = md5( password );

                $("#loginResult").html("");

                	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
                let obj = {
                    login: login,
                    password: password
                };
                let jsonPayload = JSON.stringify(obj);


                let url = baseURL + '/Login.' + extension;

                let xhr = new XMLHttpRequest();
                xhr.open("POST", url, false);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                try {
                    xhr.send(jsonPayload);
                    let jsonObject = JSON.parse(xhr.responseText);

                    userID = jsonObject.id;

                    if (userID < 1) {
                        $("#loginResult").html("User/Password combination incorrect");
                        return;
                    }

                    firstName = jsonObject.firstName;
                    lastName = jsonObject.lastName;

                    saveCookie();

                    window.location.href = "index.html";
                } catch (err) {
                    $("#loginResult").html(err.message);
                }
            }
        });
    });

    $(function () {
        $("form[name='registration']").validate({
            rules: {
                firstname: {
                    required: true,
                },
                lastname: {
                    required: true,
                },
                username1: {
                    required: true,
                },
                password1: {
                    required: true,
                    minlength: 5
                },
                passwordConfirm: {
                    equalTo: "#password1"
                }
            },

            messages: {
                firstname: "Please enter your first Name",
                lastname: "Please enter your last Name",
                username1: "Please enter a valid Username",
                password1: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                passwordConfirm: {
                    equalTo: "Your passwords do not match"
                },
            },

            submitHandler: function (form) {

                userID = 0;
                firstName = $("#firstname").val();;
                lastName = $("#lastname").val();;

                let login = $("#username1").val();
                let password = $("#password1").val();
                	var hash = md5( password );

                $("#loginResult").html("");

                	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';

                let obj = {
                    login: login,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                };
                let jsonPayload = JSON.stringify(obj);

                let url = baseURL + '/Signup.' + extension;

                let xhr = new XMLHttpRequest();
                xhr.open("POST", url, false);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                try {
                    xhr.send(jsonPayload);

                    let jsonObject = JSON.parse(xhr.responseText);

                    userID = jsonObject.id;

                    if (userID < 1) {
                        $("#signupResult").html("Username unavailable incorrect");
                        return;
                    }

                    window.location.href = "login.html";
                } catch (err) {
                    $("#signupResult").html(err.message);
                }
            }
        });
    });
});