function addContact() {
    var addFirstName = $("#addFirstName").val();
    var addLastName = $("#addLastName").val();
    var addPhoneNumber = $("#addPhoneNumber").val();
    var addEmail = $("#addEmail").val();

    // make sure there is no empty string
    if (addFirstName && addLastName && addPhoneNumber && addEmail) {
        readCookie();
    
        let jsonPayload = JSON.stringify({
            firstName: addFirstName,
            lastName: addLastName,
            phone: addPhoneNumber,
            email: addEmail,
            userID: userID,
        });
    
        let url = baseURL + '/AddContact.' + extension;
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
        $('#addForm').each(function () {
            this.reset();
        });
    }
    
}
