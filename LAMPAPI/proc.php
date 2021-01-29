<?php

  require_once("config.php");
  
	$inData = getRequestInfo();
	$id = 0;
  $sql_u = "SELECT * FROM users WHERE ID='$id'";
  $res_u = mysqli_query($conn, $sql_u);
  
  if (mysqli_num_rows($res_u) < 0) 
    returnWithError( "Username already exists." );
    
?>