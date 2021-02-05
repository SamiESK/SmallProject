<?php
    require_once("config.php");

    $inData = getRequestInfo();

    $sql = "INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID) VALUES (?,?,?,?,?)";
    $stmt= $conn->prepare($sql);
    
    $stmt->bind_param("ssssi", 
        $inData["firstName"], 
        $inData["lastName"],
        $inData["phone"],
        $inData["email"],
        $inData["userID"]
    );

    if ($stmt->execute()) {
        $inData['error'] = "";
        sendResultInfoAsJson(json_encode($inData));
    } else {
        $inData['error'] = "Error in AddContact: Failed to update database";
        sendResultInfoAsJson(json_encode($inData));
    }
?>