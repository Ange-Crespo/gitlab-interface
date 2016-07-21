<?php
include 'dibi.phar';

session_start();

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
	echo 'OK';
} catch (Dibi\Exception $e) {
	echo get_class($e), ': ', $e->getMessage(), "\n";
}
try{
	$result=dibi::query('SELECT * from [Tokens_gitlab]');
	echo "\n : OOK \n";
	
} catch(Dibi\Exception $e){
	echo get_class($e), ': ', $e->getMessage(), "\n";
	}


	$pass = $result->fetchAssoc('login_user');
	var_dump($pass);
	echo $pass;
	
echo "</p>\n";
?>
