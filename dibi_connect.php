<?php
include 'dibi.phar';

session_start();

//var_dump($_SESSION['name_user']);
function return_Token(){
	try {
		dibi::connect([
			'driver' => 'mysqli',
			'host' => 'localhost',
			'username' => 'pydiouser',
			'password' => '123',
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
		$result=dibi::query('SELECT * from [Tokens_gitlab] WHERE [login_user] = "'.$_SESSION["name_user"].'"');

	} catch(Dibi\Exception $e){
		echo get_class($e), ': ', $e->getMessage(), "\n";
		//return ;
	}


		$pass = $result->fetchAll('login_user');
		//var_dump($pass);
		//var_dump($pass[0]['token_gitlab']);
		return  $pass[0]['token_gitlab'];
}
	
	$token=return_Token();
	//echo $token;
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


	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json',
			'Content-Length: ' . strlen($data_string)
	)
			);

	$result = curl_exec($ch);*/
//////////////////////// END EXAMPLE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
	
	//var_dump($result);
	return $result;
}

function Get_Project_List($token){

	/*$url1 = 'http://127.0.0.1:8080/api/v3/projects?private_token='.$token;

	$ch = curl_init($url1);
	
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json',
			'Content-Length: ' . strlen($data_string)
			)
	);

	$result = curl_exec($ch);
	$result = json_decode($result,true);*/

	//var_dump($result);
	$result=Get_something("projects?",$token);
	
	return $result;
}


//$r=Get_Project_List($token);
//var_dump($r);

function disp_Projects($token) {
	$r=Get_Project_List($token);
	//var_dump($r);
	echo 				"<div class='panel-body'>  
						<ul class='nav nav-pills nav-stacked '>  ";
	foreach ($r as $project){

	echo 						"<li class='der' onclick='get' id='".$project['id']."'> <a class='der' href='#'> <img src='images/folder.png' height='28' width='28'> <span class='Projet'>".$project['name']."</span></a> </li>  ";			
	}
	echo "					</ul>
					</div>";  
}

function Get_Project_Specific($token,$id){

	$url1 = '/projects/'.$id.'/issues?';
	 $result=Get_something($url1,$token);
	return $result;
}

function array_unshift_assoc(&$arr, $key, $val)
{
    $arr = array_reverse($arr, true);
    $arr[$key] = $val;
    $arr = array_reverse($arr, true);
    return $arr;
}

function send_Ajax_Json($method,$token){


	if ($method=='projects'){

		//return Get_Project_List($token);
		$result_not_parsed=Get_Project_List($token);
		//var_dump($result_not_parsed);
		

	}

	else if ($method=='project'){

		$result_not_parsed=Get_Project_Specific($token,$_REQUEST['project_id']);
	
	}
		$result_php_Array = json_decode($result_not_parsed,true);
		//var_dump($result_php_Array);
		$add=["size"=>count($result_php_Array)];
		$result_php_Array=$add+["list"=>$result_php_Array];
		//var_dump($result_php_Array);
		$result_json=json_encode($result_php_Array);
		//var_dump($result_json);		
		return $result_json;
	

}

//$test= '{"size":5,"list":[{"id":11, "name":"test"} ,{"id":12, "name":"test"},{"id":13, "name":"test"},{"id":14, "name":"test"},{"id":15, "name":"test"}]}';
echo send_Ajax_Json($_REQUEST['method'],$token);
//echo $test;


?>
