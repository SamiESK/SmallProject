$(document).ready(function () {
    $(function () {
        $("#nav-placeholder").load("nav.html");
    });

    document.title = 'Home' + TITLE_STR;

    readCookie();

    if (userID <= 0) {
        window.location.href = "login.html";
    }

    let jsonPayload = JSON.stringify({
        userID: userID
    });
    let url = baseURL + '/GetContacts.' + extension;

    let contactsList = '';

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $("#contacts").html("Contact(s) List");
                let jsonObject = JSON.parse(xhr.responseText);


                for (let i = 0; i < jsonObject.contacts.length; i++) {
                    contactsList += "<li class=\"list-group-item\">" + JSON.stringify(jsonObject.contacts[i]) + "</li>";
                }
                $("#contactsList").html(contactsList);
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        $("#contactsList").html(err.message);
    }
});
