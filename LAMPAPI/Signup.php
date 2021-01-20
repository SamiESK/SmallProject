<?php
    require_once("config.php");

    $inData = getRequestInfo();
	
	$id = 0;
    
    $sql = "INSERT INTO user (Login, Password, FirstName, LastName) VALUES (?,?,?,?)";
    $stmt= $conn->prepare($sql);
    
    $stmt->bind_param("ssss", 
        $inData["login"], 
        $inData["password"], 
        $inData["firstName"], 
        $inData["lastName"]);
    
    $stmt->execute();

    returnWithInfo($inData["firstName"], $inData["lastName"], 2);	
?>