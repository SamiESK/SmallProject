//search should be called on click of the search bar button, it should take the input chars and the active user ID and send to backend
  function searchFuntion()
  {
    var searchResult = document.getElementById("searchBar").value;

    let jsonPayload = JSON.stringify({
        userID: userID,
        search: searchResult,
    });

    let contactsList = '';
    let url = baseURL + '/SearchContacts.' + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
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
    }catch (err) {
        $("#contactsList").html(err.message);
    }
    buildTable(contactsList);

  }
