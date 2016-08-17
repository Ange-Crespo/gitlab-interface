<?php
include 'dibi.phar';

session_start();

//var_dump($_SESSION['name_user']);
function return_Token(){
	try {
		dibi::connect([
			'driver' => 'mysql',
			'host' => 'localhost',
			'port' => '3306',
			'username' => 'pydiouser',
			'password' => 'pydiopassword',
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
	//var_dump($token);
	//echo $token;


?>
