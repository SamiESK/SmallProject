/*
//search should be called on click of the search bar button, it should take the input chars and the active user ID and send to backend
function buildTable(data, numContacts) {
    table = document.getElementById('contactsTable')
    table.innerHTML = ''
    for (var i = 0; i < numContacts; i++) {
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
*/

function searchFuntion() {
    readCookie();
    var searchResult = document.getElementById("searchBar").value;
    var numContacts = '';
    let parse = '';
    let jsonPayload = JSON.stringify({
        userID: userID,
        search: searchResult.replace(/\s\s+/g, ' '),
    });

    let contactsList = '';
    let url = baseURL + '/SearchContacts.' + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        toastr.info("Gathering Contacts!");
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $("#contacts").html("Contact(s) List");
                let jsonObject = JSON.parse(xhr.responseText);

                numContacts = jsonObject.contacts.length;
                buildTable1(jsonObject.contacts, numContacts);
                // toastr.success("Finished Gathering Contacts!");
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        $("#contactsList").html(err.message);
    }

}

function buildTable1(data, numContacts) {
    table = document.getElementById('contactsTable')
    table.innerHTML = ''
    for (var i = 0; i < numContacts; i++) {
        phoneNum = formatPhoneNumber(data[i].Phone);
        var row = 
        $('<tr>').append(
            $('<td>').text(data[i].FirstName),
            $('<td>').text(data[i].LastName),
            $('<td>').text(data[i].Email),
            $('<td>').text(phoneNum),
            $('<td>').html(`<button type='button' class='btn' data-toggle='modal' onclick="deleteContact1(${data[i].ID}, '${data[i].FirstName}', '${data[i].LastName}');"><span style='color: tomato' class='fas fa-trash-alt'></span></button>
            <button type='button' class='btn' data-toggle='modal' data-target="#editContact" onclick="editContact1(${data[i].ID}, '${data[i].FirstName}', '${data[i].LastName}', '${data[i].Phone}', '${data[i].Email}');"><span style='color: gray' class='fas fa-cog'></span></button>`)
            ).appendTo('#contactsTable');
    }
    $('#numResults').text(`${numContacts} matching result${(numContacts > 1 || numContacts === 0) ? "s" : ""}`);
    toastr.success(`Finished Gathering ${numContacts} Contact${(numContacts > 1 || numContacts === 0) ? "s" : ""}!`);
}

/*
function buildTable1(data, numContacts) {
    table = document.getElementById('contactsTable')
    table.innerHTML = ''
    for (var i = 0; i < numContacts; i++) {
        phoneNum = formatPhoneNumber(data[i].Phone);
        var row = `<tr>
          <td>${data[i].FirstName}</td>
          <td>${data[i].LastName}</td>
          <td>${data[i].Email}</td>
          <td>${phoneNum}</td>
          <td><button type='button' class='btn' data-toggle='modal' onclick="deleteContact1(${data[i].ID}, '${data[i].FirstName}', '${data[i].LastName}');"><span style='color: tomato' class='fas fa-trash-alt'></span></button>
          <button type='button' class='btn' data-toggle='modal' data-target="#editContact" onclick="editContact1(${data[i].ID}, '${data[i].FirstName}', '${data[i].LastName}', '${data[i].Phone}', '${data[i].Email}');"><span style='color: gray' class='fas fa-cog'></span></button></td>
          </tr>`
        table.innerHTML += row
    }
}
*/

// allow user to use enter key to submit
$(document).ready(function () {
    document.title = document.title + TITLE_STR;

    readCookie();

    //$("#tableHeader").html(firstName + " " + lastName + "'s Contacts");
    toastr.info("", "Welcome back " + firstName + "!", {positionClass: "toast-top-center"});

    $("#searchBar").on("keyup", function (event) {
        if (event.keyCode === 13) {
            $("#searchBtn").click();
        }
    });

    $("#editForm input").on("keyup", function (event) {
        if (event.keyCode === 13) {
            $("#editButton").click();
        }
    });

    $("#addForm input").on("keyup", function (event) {
        if (event.keyCode === 13) {
            $("#addButton").click();
        }
    });
})
