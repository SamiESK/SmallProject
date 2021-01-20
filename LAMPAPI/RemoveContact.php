<?php
    require_once("config.php");

    $inData = getRequestInfo();

    $sql = "DELETE FROM contacts where id=?";
    $stmt= $conn->prepare($sql);

    $stmt->bind_param("i", $inData["contactID"]);

    sendResultInfoAsJson(json_encode($inData));

    $stmt->execute();
?>
