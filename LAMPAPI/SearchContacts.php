<?php
    require_once("config.php");
    
    $inData = getRequestInfo();

    $search = $inData["search"];

    $sql = "SELECT * FROM Contacts WHERE UserID='" . $inData["userID"] . "'";
    $sql .= " AND (FirstName LIKE '%" . $search . "%'";
    $sql .= " OR LastName LIKE '%" . $search . "%'";
    $sql .= " OR Phone LIKE '%" . $search . "%'";
    $sql .= " OR DateCreated LIKE '%" . $search . "%'";
    $sql .= " OR Email LIKE '%" . $search . "%')";

    $result = $conn->query($sql);

    $searchResults = "";
    
    $searchResults = packageContactsAsJson($result);

    sendResultInfoAsJson( $searchResults );

?>

