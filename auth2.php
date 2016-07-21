<?php
	session_start();
	
	$_SESSION['private_key']=$_POST['key'];	
	$_SESSION['login'] = $_REQUEST['name'] ;
	
	
	
?>
