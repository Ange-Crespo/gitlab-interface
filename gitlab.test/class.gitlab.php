<?php

defined('AJXP_EXEC') or die( 'Access not allowed');



class Gitlab extends AJXP_Plugin
{

	public static function filterVars(&$value)
    	{
        	if (AuthService::getLoggedUser() != null) {
            		$value = str_replace("CUSTOM_VARIABLE_USER", AuthService::getLoggedUser()->getId(), $value);
       	 	}
    	}
	public function test()
	{
		var_dump(AuthService::usersEnabled());
		echo "lala" ;
		echo "javascript:alert('Mdp OK')"; 
		
	}
	public function sendName()
	{
		/*
		$root="http://localhost/gitlab-interface?name=";
		if (AuthService::getLoggedUser() != null) {
            		$loggedUser = AuthService::getLoggedUser();
			$id=$loggedUser->getId();
			$username=$loggedUser->personalRole->filterParameterValue("core.conf", "USER_DISPLAY_NAME", AJXP_REPO_SCOPE_ALL, "");
			
        	}
		
		else{
			$username=default1;

		}*/
		var_dump(AuthService::usersEnabled());
		print('<script> document.getElementById("button_gitab").innerHTML = "Come on";</script>');

//'<script> window.location='.$root.$userName.'</script>'
//<button id="button_gitab" class="btn btn-inverse Gitlab" ajxpClass="Gitlab" style="color : white;" onclick="window.location='.$root.$userName.'">Accéder à mon interface de déclaration de bugs</button>

//<script> document.getElementById("button_gitab").innerHTML = "Come on";</script>
	
	}


}

