<?php
    require_once("config.php");

    $inData = getRequestInfo();

    $sql = "DELETE FROM Contacts where id=?";
    $stmt= $conn->prepare($sql);

    $stmt->bind_param("i", $inData["contactID"]);

    if ($stmt->execute()) {
        $inData['error'] = "";
        sendResultInfoAsJson(json_encode($inData));
    } else {
        $inData['error'] = "Error in RemoveContact: Failed to update database";
        sendResultInfoAsJson(json_encode($inData));
    }
?>
