  function editContact(){

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
