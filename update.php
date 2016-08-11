<?php

include "dibi_connect.php";
session_start();
///////////////////////////////////////////////////////////////////////////// PARTIE PUT/UPDATE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//////////////////////////// EXAMPLE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/*$params = array(
			'email' => 'contact@picodev.fr',
			'username' => $login,
			'password' => $passwd,
			'name' => $login,
			'confirm'=>'no',
	);


	// setup url
	$url2 = 'http://127.0.0.1:8081/api/v3/users?private_token=SdruySSr_eEPVbpCNxoB';
	// json encode params
	$data_string = json_encode($params);

	echo $data_string;
	$ch = curl_init($url2);


	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json',
			'Content-Length: ' . strlen($data_string)
	)
			);

	$result = curl_exec($ch);*/
//////////////////////// END EXAMPLE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function update_issue($token){
		
		$url2 = 'http://46.105.102.134:8081/api/v3/projects/'.$_REQUEST['project_id'].'/issues/'.$_REQUEST['issue_id'].'?private_token='.$token;
		$data_string = file_get_contents("php://input");
		
			    
		$ch = curl_init($url2);

		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
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

function update_state($token){

	
	return update_issue($token);

}

function update_type($token){

	return $result;

}

function update_message($token){

	return $result;

}

function rm_message($token){

	return $result;

}

function post_message($token){

		$url2 = 'http://127.0.0.1:8081/api/v3/projects/'.$_REQUEST['project_id'].'/issues/'.$_REQUEST['issue_id'].'/notes?private_token='.$token;
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

function select_method($token){

	if ($_REQUEST['methode']=="uptmessage"){

		return update_message($token);

	}


	else if ($_REQUEST['methode']=="rmmessage"){

		return rm_message($token);

	}

	else if ($_REQUEST['methode']=="postmessage"){

		return post_message($token);

	}
		
	else if ($_REQUEST['methode']=="uptissue"){

		return update_issue($token);

	}


}

echo select_method($token);


?>
