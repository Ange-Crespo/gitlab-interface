<?php
include 'dibi.phar';

session_start();

//var_dump($_SESSION['name_user']);

function Get_something($specific_link,$token){

	$url1='http://127.0.0.1:8080/api/v3/'.$specific_link.'&private_token='.$token;
	
	$ch = curl_init($url1);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json',
			'Content-Length: ' . strlen($data_string)
			)
	);
	$result = curl_exec($ch);
	
	//var_dump($url1);
	return $result;
}

function return_users(){
	try {
		dibi::connect([
			'driver' => 'mysqli',
			'host' => 'localhost',
			'username' => 'pydiouser',
			'password' => '123',  // pydiopassword on the server
			'database' => 'pydiodb',
			'options' => [
				MYSQLI_OPT_CONNECT_TIMEOUT => 30,
			],
			'flags' => MYSQLI_CLIENT_COMPRESS,
		]);
	
	} catch (Dibi\Exception $e) {
		echo get_class($e), ': ', $e->getMessage(), "\n";
		//return ;
	}


	try{
		$result=dibi::query('SELECT * from [Tokens_gitlab] ');

	} catch(Dibi\Exception $e){
		echo get_class($e), ': ', $e->getMessage(), "\n";
		//return ;
	}


		$pass = $result->fetchAll('login_user');
		//var_dump($pass);
		$pass=json_encode($pass);
		return  $pass;
}
	
	
function test_Token($user){

	

	$token=$user->token_gitlab;

	$id_gitlab=$user->id_gitlab_user;
	
	$test=Get_something('users/'.$id_gitlab.'?',$token);
	
	$test=json_decode($test, $assoc=TRUE);
	
	if($test[message]==null){
		
		return true;
	} 
	
	else {
		
		return false;

	}
	return false;
}

function test_all_Token($users){
	
	$users=json_decode($users);
	$tab=array();
	foreach($users as &$user){
			
		
		$result=test_Token($user);
		$user->test_token=$result;
		array_push($tab,$user);
	}
	$add=["size"=>count($tab)];
	$tab=$add+["list"=>$tab];
	$tab=json_encode($tab);
	return $tab;
}

	$users=return_users();
	
	$Test=test_all_Token($users);

function main($method){

	if ($method=="listcheck"){

		$users=return_users();
	
		$Test=test_all_Token($users);
		
		return $Test;
	}


}

//$user_gitlab_Data['login_user'] =$login;// here we prepare an array to send to the db.
//dibi::query('INSERT INTO [Tokens_gitlab]', $user_gitlab_Data);


echo main($_REQUEST['method']);


?>
