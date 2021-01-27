//funtion to build the table in html and display
  function buildTable(data){
    var table ='';
    table = document.getElementById('contactsTable')

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
