<?php

include "dibi_connect.php";
session_start();

//var_dump($token);
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

function Get_Project_List($token){

	$result=Get_something("projects?",$token);
	
	return $result;
}

function Get_Project_Specific($token,$id){

	$url1 = '/projects/'.$id.'/issues?';
	$result=Get_something($url1,$token);
	return $result;
}

function Get_Issue_Detail($token,$id_project,$id_issue){

	$url="projects/".$id_project."/issues/".$id_issue."/?";
	$result=Get_something($url,$token);
	return $result;
}

function Get_notes($token,$id_project,$id_issue){

	$url="projects/".$id_project."/issues/".$id_issue."/notes?";
	$result=Get_something($url,$token);
	return $result;

}

function Get_members($token,$id_project){

	$url1 = '/projects/'.$id_project.'/members?';
	$result=Get_something($url1,$token);
	return $result;

}

function Get_modules($token,$id_project){

	$url1 = '/projects/'.$id_project.'/milestones?';
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
	
	if ($method=='issue'){

		$result_not_parsed=Get_Issue_Detail($token,$_REQUEST['project_id'],$_REQUEST['issue_id']);
		$result_php_Array = json_decode($result_not_parsed,true);
		$result_php_Array['created_at2']=AffDate($result_php_Array['created_at']);
		$result_php_Array['updated_at2']=AffDate($result_php_Array['updated_at']);
		$result_php_Array=Update_labels($result_php_Array);

	}

	else{ 

		if ($method=='project'){

			$result_not_parsed=Get_Project_Specific($token,$_REQUEST['project_id']);
	
		}

		else if ($method=='projects'){

			$result_not_parsed=Get_Project_List($token);
		
		}
	
		else if ($method=='notes'){

			$result_not_parsed=Get_notes($token,$_REQUEST['project_id'],$_REQUEST['issue_id']);

		}
		
		else if ($method=='members'){

			$result_not_parsed=Get_members($token,$_REQUEST['project_id']);

		}

		else if ($method=='modules'){

			$result_not_parsed=Get_modules($token,$_REQUEST['project_id']);

		}

		$result_php_Array = json_decode($result_not_parsed,true);
		$result_php_Array=Update_all_Date($result_php_Array); // on passe du format d'horaire avec offset sur les zones internationnale à un format user friendly
		$add=["size"=>count($result_php_Array)];
		$result_php_Array=$add+["list"=>$result_php_Array];
		
	}

	$result_json=json_encode($result_php_Array);
		
	return $result_json;
}


echo send_Ajax_Json($_REQUEST['method'],$token); // C'est la ligne de retour !!!!

function AffDate($date){
 	if(!ctype_digit($date))

 		 $date = strtotime($date);

	
 		if(date('Ymd', $date) == date('Ymd')){

 			$diff = time()-$date;

 			if($diff < 60) /* moins de 60 secondes */

  				return 'Il y a '.$diff.' sec';

 			else if($diff < 3600) /* moins d'une heure */

  				return 'Il y a '.round($diff/60, 0).' min';

  			else if($diff < 10800) /* moins de 3 heures */
   				
				return 'Il y a '.round($diff/3600, 0).' heures';
	
  			else /*  plus de 3 heures ont affiche ajourd'hui à HH:MM:SS */
   				
				return 'Aujourd\'hui à '.date('H:i:s', $date);
 		}

 		else if(date('Ymd', $date) == date('Ymd', strtotime('- 1 DAY')))

  			return 'Hier à '.date('H:i:s', $date);

 		else if(date('Ymd', $date) == date('Ymd', strtotime('- 2 DAY')))

			return 'Il y a 2 jours à '.date('H:i:s', $date);

 		else

  			return 'Le '.date('d/m/Y à H:i:s', $date);
}

function Update_all_Date($Array){

	foreach ($Array as &$project) {

		$project['created_at2']=AffDate($project['created_at']);

		if($project['last_activity_at']){
	
			$project['last_activity_at2']=AffDate($project['last_activity_at']);

		}

		if($project['updated_at']){

			$project['updated_at2']=AffDate($project['updated_at']);

		}
	
	}
	
	return $Array;
}

function Update_labels($Array){
	
	$version_issue=array();
	$version_resolved=array();
	$tags=array();
	$myspecs=["#vi","#vr","#t","#s"];
	$done=false;
	
	foreach ($Array['labels'] as $label){
	
		$done=false;

		foreach ($myspecs as $spec){

			$pos= strpos($label, $spec);
			

			if ($pos!==false && $done===false){
			
				if ($spec=="#vi"){

					
					$label=substr($label, 4); 
					array_push($version_issue, $label);
					$done=true;
			
				}

				else if ($spec=="#vr" && $done===false){

					
					$label=substr($label, 4); 
					array_push($version_resolved, $label);
					$done=true;

				}

				else if ($spec=="#t" && $done===false){
					
					$type=substr($label, 3);
					$done=true;

				}
				
				else if ($spec=="#s" && $done===false){
					
					$state=substr($label, 3);
					
					$done=true;

				}			
			}
	
		}
		if ($done===false){

				$label=substr($label, 3); 
				array_push($tags, $label);
				$done=true;

		}
		
	}
	
	$Array["version_issue"] = $version_issue;
	$Array["version_resolved"] = $version_resolved;

	$Array["labels"] = $tags;
	
	if ($type==null){

		$Array["type2"]="bug";
	
	}

	else{

		$Array["type2"] = $type;

	}


	if ($state==null){

		$Array["state2"]=$Array["state"];

	}

	else{

		$Array["state2"] = $state;

	}

	return $Array;

}

function isVisible($Array){ //fonction à faire une de ces 4 pour rendre visible seulement les issue que l'on souhaite 

// Utiliser labels : "#invisible","#visible"

	return 0;

}

?>
