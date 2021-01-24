<?php
    require_once("config.php");

    $inData = getRequestInfo();

    $id = $inData["id"];

    foreach($inData as $key => $value) {
        if($value && strcmp($key, $id) != 0) {
            mysqli_query($conn,"UPDATE Contacts SET ". $key ." = '". $value ."' WHERE id = '". $id ."' LIMIT 1");
        }
    }

    sendResultInfoAsJson(json_encode($inData));
?>
