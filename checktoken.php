<?php
session_start();
//var_dump($_SESSION["name_user"]);
//var_dump($_SESSION['private_key']);

if ($_COOKIE['name']!=$_SESSION['private_key'] || $_COOKIE['name']==null )

{

	echo "<script> function gotoGoogle(){

			window.location='http://google.fr';
	}

			

	 gotoGoogle(); </script>";


}

//include ('dibi_connect.php');
?>

<!doctype html>  
 <html lang="fr">  
 <head>   
 <meta charset="utf-8">  
 <title>Relever les bugs et améliorations</title>  
 <link href="http://fonts.googleapis.com/css?family=Open+Sans+Light' rel= 'stylesheet '  type= 'text/css '  ">  

    <!-- Bootstrap Core CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

	<link rel="stylesheet" href="bower_components/bootstrap-table/dist/bootstrap-table.css">
	<link href="http://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
 
 <link href="css/bootstrap.min.css" rel="stylesheet">  
 <link rel="stylesheet"  href="stylegit.css">  
 <!--[if lt IE 9]>  
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>  
 <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>  
 <![endif]-->  
 </head>  
	 <body>  
	
	  <div>  
	
		  <header class="header1 container-fluid">  
		
		 	 <div class="page-header headercolor container-fluid">  
				
		 
		 		 <div class="espace">  
		 		
					
				 </div>  
		 				
				 <h4 class="headerwords"> <img src="images/picodev.png"  height= '40 ' width= '32 ' class="imgheader pull-left"><span class="perso">Vérification des tokens</span></h4>  
			
				
				 </div>  
			
	 	 </header> 
	 	 
	 </div> 
	 	
	  <div class= 'espace '>  
	
	 	 <div class=" Panel">  
	 	
			 <div class=" espace2 ">  
			
				 <div class="headcollon ">  
				
				 </div>  
				
				 <div class="headPanel">  
				
				 </div>  
				
				 </div>  
				
				 <div class="cont">  
				
					 <nav class="collon">       
	
	 					 <ul class="nav nav-pills nav-stacked Pane ">  
	
	 						 <li class=""> <a class="Pane1" href="http://46.105.102.134/gitlab-interface/index.php"> <span class="glyphicon glyphicon-folder-close"></span> Mes Projets </a> </li>  
	
	 						 <!--<li> <a href="#"> <span class="glyphicon glyphicon-book"></span> Amélioration</a> </li>  -->
							<li><a class="btn btn-inverse" style="color : white;" href='http://46.105.102.134/pydio'>Retour pour l'échange de fichier</a></li>
	 		
	
	 					 </ul>  
	
	 				 </nav>  
	 				
					
	 						 <div class="panel" style="display: inline-block">  
	
	 							 <div class="panel-heading">  
	
	 								 <h3 id="Titre" class="panel-title"></h3>  
	
	 							 </div>  
								<div id="BTable">								
									<table id="table" data-toggle="table">
    										
										<!--<thead>
        
											<tr>
            
												<th>Name</th>

            											<th>Token</th>

            											<th>Status</th>
												
												<th>Reset Token</th>
        										</tr>

										</thead>

										<tbody>

											<tr>

												<td>1</td>

            											<td>Item 1</td>

            											<td>$1</td>
								
												
       											</tr>

        										<tr>

            											<td>2</td>

           											<td>Item 2</td>

           											<td>$2</td>

        										</tr>

    										</tbody>-->

									</table>
								</div>							 
							</div>  
	
					</div>	
				</div>
			</div>	
		 <footer class=" Foot ">  
	
		
	
				 Tous droits réservés à Picodev
	
	
	
		 </footer>  
	<!-- jQuery -->
    	<script src="bower_components/jquery/dist/jquery.min.js"></script>

	<!-- Bootstrap Core JavaScript -->
    	<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="bower_components/bootstrap-table/dist/bootstrap-table.min.js"></script>
	<script src="bower_components/tableExport.jquery.plugin/tableExport.min.js"></script>
	<script src="bower_components/bootstrap-table/dist/extensions/export/bootstrap-table-export.js"> </script>
	<script src="bower_components/bootstrap-table/dist/extensions/editable/bootstrap-table-editable.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>
		
	<script src="checktoken.js"></script>  
	 </body>  
	
 </html>  

