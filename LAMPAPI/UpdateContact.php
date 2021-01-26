<?php
    require_once("config.php");

    $inData = getRequestInfo();

    $id = $inData["contactID"];

    $error = "";

    foreach($inData as $key => $value) {
        if($value && strcmp($key, "contactID") != 0) {
            $success = mysqli_query($conn,"UPDATE Contacts SET ". $key ." = '". $value ."' WHERE id = '". $id ."' LIMIT 1");
            $error .= ($success) ? "" : "Error: Failed to update " . $key . " for UserID " . $id . "; ";
        }
    }

    $inData['error'] = $error;
    sendResultInfoAsJson(json_encode($inData));


?>

