/*
function editContact() {

    readCookie();
    var editFirstName = document.getElementById("editFirstName").value;
    var editLastName = document.getElementById("editLastName").value;
    var editPhoneNumber = document.getElementById("editPhoneNumber").value;
    var editEmail = document.getElementById("editEmail").value;
    var editContactID = document.getElementById("contactID").value;


    let jsonPayload = JSON.stringify({
        firstName: editFirstName,
        lastName: editLastName,
        phone: editPhoneNumber,
        email: editEmail,
        contactID: editContactID,
        userID: userID,
    });
    console.log(jsonPayload);
    let url = baseURL + '/UpdateContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(jsonPayload);
}
*/

function editContact1(editContactID, firstName, lastName, phone, email) {
    console.log(editContactID, firstName, lastName, phone, email);
    // fill with current values
    $("#editFirstName").val(firstName);
    $("#editLastName").val(lastName);
    $("#editPhoneNumber").val(phone);
    $("#editEmail").val(email);

    $("#checkEmail2").html("");
    $("#checkPhone2").html("");

    $("#editButton").on("click", function () {
        readCookie();
        let editFirstName = $("#editFirstName").val();
        let editLastName = $("#editLastName").val();
        let editPhoneNumber = $("#editPhoneNumber").val();
        let editEmail = $("#editEmail").val();

        if (!validateEmail(editEmail)) {
            $("#checkEmail2").html("Invalid Email Address");
        }
        if (!validatePhone(editPhoneNumber)) {
            $("#checkPhone2").html("Invalid Phone Number");
        }
        if (!validatePhone(editPhoneNumber) || !validateEmail(editEmail)) {
            return;
        }

        let jsonPayload = JSON.stringify({
            firstName: editFirstName,
            lastName: editLastName,
            phone: editPhoneNumber,
            email: editEmail,
            contactID: editContactID,
            userID: userID,
        });
        console.log(jsonPayload);
        let url = baseURL + '/UpdateContact.' + extension;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
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

        // clears form after submission
        $('#editForm').each(function () {
            this.reset();
        });
    });
}
