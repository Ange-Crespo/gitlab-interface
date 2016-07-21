<?php
session_start();
?>


<?php

if ($_REQUEST['reset']==true)
{	
	$_SESSION['cookie_set']=false;
	session_destroy();
	session_start();	
}

if ($_SESSION['cookie_set']==false || $_SESSION['cookie_set']==null)
{	$_SESSION['cookie_set']=true;
	$_SESSION['login'] = $_REQUEST['name'] ;

	echo "<script>  


	function setCookie(cname, cvalue, exdays) 
	{
   		 var d = new Date();
    		d.setTime(d.getTime() + (exdays*24*60*60*1000));
    		var expires = 'expires='+ d.toUTCString();
    		document.cookie = cname + '=' + cvalue + '; ' + expires;
	}    


	function makeid()
	{
    		var text = '';
    		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    	for( var i=0; i < 10; i++ )
        	text += possible.charAt(Math.floor(Math.random() * possible.length));

    	return text;
	}
	
	var key=makeid();
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'auth2.php', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('key=' + key);
	xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                
            }
        };
      
    
	setCookie('name',key,1);
	</script>";
	
}

else{
	
	
	
	echo "<script>
	function reset_All(){
		window.location='http://localhost/gitlab-interface/auth.php?reset=true';
	}

	window.location='http://localhost/gitlab-interface/index.php';
	 </script>";	
}

?>
