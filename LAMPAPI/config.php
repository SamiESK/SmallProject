<?php

// Change login to work on Server
$conn = new mysqli("localhost", "api", "TheBoysContacts", "SPIRA");    

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

/*
if ($conn->connect_error) 
{
    returnWithError( $conn->connect_error );
} 
*/

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function packageContactsAsJson($contacts)
{
    $searchCount = 0;
    $searchResults = "";
    while($row = $contacts->fetch_assoc()) {
        if( $searchCount > 0 ) {
            $searchResults .= ",";
        }

        $searchCount++;

        $searchResults .= '{';
        foreach($row as $key => $value) {
            if($value && strcmp($key, 'UserID')  != 0) {
                $searchResults .= '"' . $key . '":"' . $value . '",';
            }
        }
        $searchResults = rtrim($searchResults, ',');
        $searchResults .= "}";            
    }
    return '{"contacts" :[ ' . $searchResults . "]}";
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError( $err )
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $firstName, $lastName, $id )
{
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

?>