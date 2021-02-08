<?php
    require_once("config.php");

    $inData = getRequestInfo();

    $sql = "SELECT 1 FROM User WHERE Login='". $inData["login"] ."' LIMIT 1";

    $stmt = $conn->prepare($sql);
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

    sendResultInfoAsJson( $searchResults );
?>
