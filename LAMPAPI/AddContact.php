<?php
    require_once("config.php");

    $inData = getRequestInfo();

    //$sql = "INSERT INTO contacts (FirstName, LastName, Phone, Email, Address, City, State, Zip, userID) VALUES (?,?,?,?,?,?,?,?,?)";

    $sql = "INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID) VALUES (?,?,?,?,?)";
    $stmt= $conn->prepare($sql);
    
    $stmt->bind_param("ssssi", 
        $inData["firstName"], 
        $inData["lastName"],
        $inData["phone"],
        $inData["email"],
        //$inData["address"],
        //$inData["city"],
        //$inData["state"],
        //$inData["zip"],
        $inData["userID"]
    );
    sendResultInfoAsJson(json_encode($inData));
    $stmt->execute();
?>