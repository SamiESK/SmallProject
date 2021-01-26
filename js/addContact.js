
  function addContact()
  {
     var addFirstName = document.getElementById("addFirstName").value;
     var addLastName = document.getElementById("addLastName").value;
     var addPhoneNumber = document.getElementById("addPhoneNumber").value;
     var addEmail = document.getElementById("addEmail").value;

     let jsonPayload = JSON.stringify({
         firstname: addFirstName,
         lastname: addLastName,
         phone: addPhoneNumber,
         email: addEmail,
         userID: 0,
     });

     console.log(jsonPayload);

     
  }
