<?php
    require_once("config.php");

    $inData = getRequestInfo();

    $id = $inData["id"];

    unset($inData->id);

    foreach($inData as $key => $value) {
        if($value) {
            mysqli_query($conn,"UPDATE contacts SET ". $key ." = '". $value ."' WHERE id = '". $id ."' LIMIT 1");
        }
    }

    sendResultInfoAsJson(json_encode($inData));
?>
