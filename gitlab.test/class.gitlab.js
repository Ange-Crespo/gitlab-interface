



function loadGitlab(){

	var name=(ajaxplorer.user.getPreference("USER_DISPLAY_NAME") || ajaxplorer.user.id);
	
	window.location="http://46.105.102.134/gitlab-interface/auth.php?reset=true&name="+name;
}


