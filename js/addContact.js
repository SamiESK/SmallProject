function addContact()
  {
    readCookie();

     var addFirstName = document.getElementById("addFirstName").value;
     var addLastName = document.getElementById("addLastName").value;
     var addPhoneNumber = document.getElementById("addPhoneNumber").value;
     var addEmail = document.getElementById("addEmail").value;

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
   	 xhr.send(jsonPayload);
  }
