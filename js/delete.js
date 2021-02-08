/*
function deleteContact() {
    readCookie();
    var deleteTextBox = document.getElementById("deleteTextBox").value;


    let jsonPayload = JSON.stringify({
        contactID: deleteTextBox,
        userID: userID,
    });

    console.log(jsonPayload)
    let url = baseURL + '/RemoveContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(jsonPayload);
}
*/

// delete the contact with confirmation and refresh search list
function deleteContact1(contactID, firstName, lastName) {
    if (confirm("Are you sure you want to delete " + firstName + " " + lastName + "?")) {
        readCookie();
        console.log(contactID);
        let jsonPayload = JSON.stringify({
            contactID: contactID,
            userID: userID,
        });

        let url = baseURL + '/RemoveContact.' + extension;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let jsonObject = JSON.parse(xhr.responseText);

                    if (jsonObject.error) {
                        toastr.error("Failed to Remove " + firstName + " " + lastName + " from Contacts List.");
                    } else {
                        toastr.success("Removed " + firstName + " " + lastName + " from Contacts List!");
                        // searchFuntion();
                    }
                }
            };
            xhr.send(jsonPayload);
        } catch (err) {
            $("#contactsList").html(err.message);
        }
    }
}
