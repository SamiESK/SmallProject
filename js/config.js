const TITLE_STR = ' - Spira Contact Manager'

var baseURL = 'http://' + window.location.hostname + '/LAMPAPI';
var extension = 'php';
var userID = 0;
var firstName = "";
var lastName = "";


function saveCookie() {
    var minutes = 20;
    var date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userID + ";expires=" + date.toGMTString();
}

function readCookie() {
    userID = -1;
    var data = document.cookie;
    var splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        var thisOne = splits[i].trim();
        var tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        } else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        } else if (tokens[0] == "userId") {
            userID = parseInt(tokens[1].trim());
        }
    }

    if (userID < 0) {
        window.location.href = "index.html";
    } else {
        $("#userName").html("Logged in as " + firstName + " " + lastName);
    }
}

function doLogout() {
    userID = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function refreshSearchTable(xhr) {
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                searchFuntion();
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        $("#contactsList").html(err.message);
    }
}

function validatePhone(str) {
    let clean = str.replace(/\D/g,'');
    let phoneno = /^\d{10}$/;
    if (clean.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}

function formatPhoneNumber(str) {
    let cleaned = ('' + str).replace(/\D/g, '');
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        let intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
