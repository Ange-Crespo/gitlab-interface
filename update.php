<?php

include "dibi_connect.php";
session_start();
/////////////////////////////////////////////////////////////////////////////PARTIE PUT/UPDATE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//////////////////////////// EXAMPLE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/*$params = array(
			'email' => 'contact@picodev.fr',
			'username' => $login,
			'password' => $passwd,
			'name' => $login,
			'confirm'=>'no',
	);


	// setup url
	$url2 = 'http://127.0.0.1:8080/api/v3/users?private_token=SdruySSr_eEPVbpCNxoB';
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

	//if (isset($_POST)){
			
	/*$assignee=array("id"=>11);	
	$params=array(
			
			"title" => "Test12",
			"description" => 'caca',
			"assignee" =>$assignee
	);*/
		$params=$_POST;
		//var_dump($params);
		$url2 = 'http://127.0.0.1:8080/api/v3/projects/'.$_REQUEST['project_id'].'/issues/'.$_REQUEST['issue_id'].'?private_token='.$token;
		//var_dump(json_decode(file_get_contents("php://input")));
		//$data_string = json_encode($params);
		//$data_string={"title":"Test1","description":"caca666","assignee_id":1,"milestone_id":9,"labels":"#t test,#a autre, caca"};
		var_dump($data_string);	    
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
	//}
}

echo update_issue($token);

?>
