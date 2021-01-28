//search should be called on click of the search bar button, it should take the input chars and the active user ID and send to backend
function buildTable(data, numContacts){
  table = document.getElementById('contactsTable')
  table.innerHTML = ''
  for (var i = 0; i < numContacts; i++){
    var row = `<tr>
            <td>${data[i].ID}</td>
            <td>${data[i].FirstName}</td>
            <td>${data[i].LastName}</td>
            <td>${data[i].Phone}</td>
            <td>${data[i].Email}</td>
          </tr>`
    table.innerHTML += row
  }
}
  function searchFuntion()
  {
    var searchResult = document.getElementById("searchBar").value;
    var numContacts = '';
    let parse = '';
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

              numContacts = jsonObject.contacts.length;
              buildTable(jsonObject.contacts, numContacts);
          }
      };
      xhr.send(jsonPayload);
    }catch (err) {
        $("#contactsList").html(err.message);
    }

  }
