<?php
    require_once("config.php");

    $inData = getRequestInfo();

    $sql = "SELECT 1 FROM Contacts WHERE (UserID=? AND FirstName=? AND LastName=?) LIMIT 1";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("iss", $inData["userID"], $inData["firstName"], $inData["lastName"]);

    $stmt->bind_result($exists);
    $stmt->execute();
    $stmt->fetch();

    $searchResults = "";
    if ($exists) {
        $obj = (object) array(
            'exists' => true
        );
        $searchResults = json_encode($obj);
    }
    else {
        $obj = (object) array(
            'exists' => false
        );
        $searchResults = json_encode($obj);
    }

    sendResultInfoAsJson($searchResults);
?>
