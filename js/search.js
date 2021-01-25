$(document).ready(function () {

  var myArray = [
      {'ID' : '1', 'name':'Michael', 'lname':'smith', 'number':'000000', 'email' : 'example@hotmain.com'},
      {'ID' : '2','name':'tom', 'lname':'higgins', 'number':'696969', 'email' : 'example2@hotmain.com'},
  ]

  buildTable(myArray);

  function search()
  {
    var searchResult = document.getElementById("searchBar").value;

    let jsonPayload = JSON.stringify({
        userID: userID,
        search: searchResult,
    });

    let contactsList = '';

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
  }

  function buildTable(data){
    var table = document.getElementById('contactsTable')

    for (var i = 0; i < data.length; i++){
      var row = `<tr>
              <td>${data[i].ID}</td>
              <td>${data[i].name}</td>
              <td>${data[i].lname}</td>
              <td>${data[i].number}</td>
              <td>${data[i].email}</td>
              <td><button type="button" class="btn" data-toggle="modal" data-target="#editContact"><span style="color: gray"class="fas fa-cog"></span></button><button type="button" class="btn" data-toggle="modal" data-target="#"><span style="color: tomato"class="fas fa-trash-alt"></span></button></td>
            </tr>`
      table.innerHTML += row


    }
  }
});
