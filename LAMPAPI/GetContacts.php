<?php
    require_once("config.php");

    $inData = getRequestInfo();

    $sql = "select * from contacts where UserID=" . $inData["userID"];
    $result = $conn->query($sql);

    $searchResults = "";
    if ($result->num_rows > 0) {
        $searchResults = packageContactsAsJson($result);
    }
    else {
        returnWithError( "No Records Found" );
    }

    sendResultInfoAsJson( $searchResults );
?>

