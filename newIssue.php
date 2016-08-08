<?php

include "dibi_connect.php";

session_start();

function create_issue($token){
		
		$url2 = 'http://127.0.0.1:8080/api/v3/projects/'.$_REQUEST['project_id'].'/issues?private_token='.$token;
		$data_string = file_get_contents("php://input");
			    
		$ch = curl_init($url2);

		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json',
			'Content-Length: ' . strlen($data_string)
		)
			);

		$result = curl_exec($ch);
		return $result;

}

echo create_issue($token);

?>
