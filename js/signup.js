$(document).ready(function () {
    document.title = 'Sign Up' + TITLE_STR;
    
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
                //	var hash = md5( password );

                $("#signupResult").html("");

                //	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
                
                userExists = false;
                
                /*
                $.ajax({
                    type: "POST",
                    url: baseURL + "/CheckUser.php",
                    data: JSON.stringify({ login: $("#username1").val() }),
                    contentType: "application/json; charset=utf-8",
                    dataType:"json",
                    success: function(res)
                    {
                        //If username exists, set userExists to true
                        userExists = res.exists;
                    }
                });
                */

                if (userExists) {
                    $("#signupResult").html("Username is Already Taken");
                    return;
                }

                let obj = {
                    login: login,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                };
                let jsonPayload = JSON.stringify(obj);

                let url = baseURL + '/Signup.' + extension;

                let xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                try {
                    xhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let jsonObject = JSON.parse(xhr.responseText);

                            userID = jsonObject.id;

                            window.location.href = "login.html";
                        }
                    };
                    xhr.send(jsonPayload);
                } catch (err) {
                    $("#signupResult").html(err.message);
                }
            }
        });
    });
});
