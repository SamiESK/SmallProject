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
            </tr>`
      table.innerHTML += row
    }
  }
