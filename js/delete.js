function deleteContact()
{
  readCookie();
  var deleteTextBox = document.getElementById("deleteTextBox").value;


  let jsonPayload = JSON.stringify({
      contactID: deleteTextBox,
      userID: userID,
  });

console.log(jsonPayload)
  let url = baseURL + '/RemoveContact.' + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(jsonPayload);
}
