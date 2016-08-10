<?php

include 'dibi.phar';

session_start();

function postToken($token,$id){
	
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
	
	$user_gitlab_Data = array('token_gitlab' => $token);
	try{
		$result=dibi::query("UPDATE [Tokens_gitlab] SET",$user_gitlab_Data,"WHERE [id]=",$id);

	} catch(Dibi\Exception $e){
		echo get_class($e), ': ', $e->getMessage(), "\n";
		//return ;
	}
	return $token;
}


echo postToken($_REQUEST['value'],$_REQUEST['id']);

?>
