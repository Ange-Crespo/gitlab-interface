//Variables globales
var Nom_du_projet="";
var Nom_issue="";
var method_retour="";
var id_retour=0;

//Fonction qui charge les tableaux et qui se lance lorsqu'on charge la page avec la method "projects"
function loadTable(method,id) {

	var url_json;

	var fields={field1:{locate:"",namee:"",visible:false}, field2:{locate:"",namee:"",visible:false}, field3:{locate:"",namee:"",visible:false}, field4:{locate:"",namee:"",visible:false},field5:{locate:"",namee:"",visible:false},field6:{locate:"",namee:"",visible:false},field7:{locate:"",namee:"",visible:false},field8:{locate:"",namee:"",visible:false}};
	gestion_contenue_vue(method);

	if (method=='projects'){

		url_json='http://localhost/gitlab-interface/dibi_connect.php?method=projects';
		
		fields.field1.locate= "id" ;
		fields.field1.namee= "Project ID" ; 
		fields.field1.visible=false;

		fields.field2.locate= "name" ;
		fields.field2.namee= "Nom du projet" ; 
		fields.field2.visible=true;

		fields.field3.locate= "owner.name" ;
		fields.field3.namee= "Owner" ; 
		fields.field3.visible=true;

		fields.field4.locate= "created_at2" ;
		fields.field4.namee= "Date de création" ; 
		fields.field4.visible=true;	

			
		fields.field5.locate= "last_activity_at2" ;
		fields.field5.namee= "Dernière modification" ; 
		fields.field5.visible=true;		

		fields.field6.visible=false;
		fields.field7.visible=false;
		fields.field8.visible=false;
			
	}
	
	if (method=='project'){
		
		url_json='http://localhost/gitlab-interface/dibi_connect.php?method=project&project_id='+id;

		fields.field1.locate= "iid" ;
		fields.field1.namee= "#" ; 
		fields.field1.visible=true;

		fields.field2.locate= "title" ;
		fields.field2.namee= "Issue" ; 
		fields.field2.visible=true;

		fields.field3.locate= "author.name" ;
		fields.field3.namee= "Auteur" ; 
		fields.field3.visible=true;
		
		fields.field4.locate= "created_at2" ;
		fields.field4.namee= "Date de création" ; 
		fields.field4.visible=true;
	
		fields.field5.locate= "state" ;
		fields.field5.namee= "Etat" ; 
		fields.field5.visible=true;

		fields.field6.locate= "updated_at2" ;
		fields.field6.namee= "Dernière modification" ; 
		fields.field6.visible=true;		

		fields.field7.locate= "milestone.title" ;
		fields.field7.namee= "Version" ; 
		fields.field7.visible=true;

		fields.field8.locate= "milestone.title" ;
		fields.field8.namee= "Module" ; 
		fields.field8.visible=true;

		
		
	}

	console.log(url_json);

	//utilisation de bootstrap table pour chager les tableaux
	$('#Table').bootstrapTable(
					{ 
						url : url_json,
					  	
						type : 'GET',
						dataType : 'json',

						ajaxOptions : {
							headers : {
								
								'Content-Type' : 'application/json'
							},
							async : true,
						},

						height : 800,
						striped : true,
						pagination : true, // si false, ça beugue :/
						pageSize : 1000,
						pageList : [ 10, 25, 50, 100, 200 ],
						search : false,
						showColumns : true,
						showHeader : true,
						showFooter : false,
						showPaginatinSwitch : true,
						showRefresh : false,
						showExport : false,
						showToggle : false,
						showColumns : false,
						sidePagination : 'server',
						minimumCountColumns : 2,
						responseHandler: (function responseHandler(res) {
							return {
					            total: res.size,
						    rows: res.list
					           
					        };
					    }),
				
					columns : [  {
							field : fields.field1.locate,
							title : fields.field1.namee,
							visible: fields.field1.visible,
							align : 'left',
							valign : 'bottom',
							sortable : true,
							width: 10,
							
						},{
							field : fields.field2.locate,
							visible: fields.field2.visible,
							title : fields.field2.namee,
							align : 'left',
							valign : 'bottom',
							sortable : true,
							
						},{
							field : fields.field3.locate,
							visible: fields.field3.visible,
							title : fields.field3.namee,
							align : 'left',
							valign : 'bottom',
							sortable : true,
							dataField : "test",
						
						},{						
							field : fields.field4.locate,
							visible: fields.field4.visible,
							title : fields.field4.namee,
							align : 'left',
							valign : 'bottom',
							sortable : true,
						},{
							field : fields.field5.locate,
							visible:fields.field5.visible,
							title : fields.field5.namee,
							align : 'left',
							valign : 'bottom',
							sortable : true,
						
						},{
							field : fields.field6.locate,
							visible: fields.field6.visible,
							title : fields.field6.namee,
							align : 'left',
							valign : 'bottom',
							sortable : true,
						
						},{
							field : fields.field7.locate,
							visible: fields.field7.visible,
							title : fields.field7.namee,
							align : 'left',
							valign : 'bottom',
							sortable : true,
						
						},{
							field : fields.field8.locate,
							visible: fields.field8.visible,
							title : fields.field8.namee,
							align : 'left',
							valign : 'bottom',
							sortable : true,
						
						} ] 
					});
};

// Fonction qui charge les information pour les issues et rempli la page issus avec les bons boutons, les commentaires etc
function loadForm(method,id_project,id_issue) {

	$("#BTable").load('form.html', function( response, status, xhr ) {
  		if ( status == "error" ) {
   			var msg = "Sorry but there was an error: ";
    			$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
 		}
	});

	gestion_contenue_vue(method);
	var url_json='http://localhost/gitlab-interface/dibi_connect.php?method=issue&project_id='+id_project+'&issue_id='+id_issue;
 	$.getJSON( url_json, function( json ) {//on a le json du projet
				
		disp_button(json);
		/*disp_title(json);
		disp_description(json);
		disp_commentaires(json);*/

 	});
	 
};

function disp_button(json){

	var Module=json.milestone.title;
	var labels=json.labels;
	var state =json.state2;
	state=equi_state(state);
	labels.forEach(function(label) {

    		console.log(label);
	
	});

	var version_issue=json.version_issue[0];
	var version_resolved=json.version_resolved[0];

	console.log(Module);
	console.log(version_issue);
	console.log(version_resolved);

	var buttonModule = document.getElementById('module');
	var buttonVersion_issue=document.getElementById('version_detect');
	var buttonVersion_resolved=document.getElementById('version_correct');
	var buttonState=document.getElementById('state');

	buttonModule.innerHTML=Module;
	buttonVersion_issue.innerHTML=version_issue;
	buttonVersion_resolved.innerHTML=version_resolved;
	buttonState_resolved.innerHTML=state;
	
	console.log(buttonModule);
	console.log(buttonVersion_issue);
	console.log(buttonVersion_resolved);

	return true;

};

function equi_state(state){

	var struc={
    			opened: 'Open',
    			closed: 'Close',
	};


	return state;
}

//fonction quand on clique sur une ligne qui retourne l'ID du project ou de l'issue
$("#BTable").on('click-row.bs.table', function (e, row, $element) {

		console.log("On clique");
		erase_DOM_part_and_edit("BTable");
		if (row.iid){                                             //Si c'est une issue
			erase_DOM("BTable");
			console.log("On fait le loadform");
			console.log(Nom_issue);
			Nom_issue=row.title;
			console.log(Nom_issue);
			loadForm('issue',row.project_id,row.id);
			console.log(row);
		
		}  

		else {						     //si ce n'est pas une issue (avoir si on affine le truc)

			console.log("On fait le loadtable");
			console.log(Nom_du_projet);
			Nom_du_projet=row.name;
			console.log(Nom_du_projet);
			loadTable('project',row.id);
			console.log(row);
			id_retour=row.id;
		}		
    	});

// fonction qui efface tout les enfants d'un élément du DOM
function erase_DOM(Select_ID){

	var element1 = document.getElementById(Select_ID);
 
	// boucle tant qu'un enfant existe
		while (element1.firstChild) {

   		// le supprime
   			element1.removeChild(element1.firstChild);
		
		}

	return element1;

};

//fonction qui permet d'ajouter un table avec l'id Table dans un élement
function DOM_edit(element1){

	var table = document.createElement('table');
	table.id="Table";
	element1.appendChild(table);

};

//fonction qui suprimme le contenu d'un élément du DOM et le remplasse par un table d'id Table
function erase_DOM_part_and_edit(Select_ID){
	
	element1=erase_DOM(Select_ID);
	DOM_edit(element1);

};

//En fonction du moment où on se trouve, gestion de la vue sauf pour le form pour simplifier.
function gestion_contenue_vue(method){
		
		if (method=='projects'){

			element1 = document.getElementById("Titre");
			element1.innerHTML="Mes Projets";
		
			element2 = document.getElementById("Bretour");
			element2.className="retour btn btn-default";
			
			element5 = document.getElementById("Bissue");
			element5.className="retour btn btn-default btn-primary";


		}

		if (method=='project'){

			element1 = document.getElementById("Titre");
			element1.innerHTML="Projet : "+Nom_du_projet;
		
			element2 = document.getElementById("Bretour");
			element2.style.display="inline-block";
			element2.className="retour-visible btn btn-default";
			
			element3 = document.getElementById("Cretour");
			element3.innerHTML=" Autres Projets";

			method_retour="projects";
			
			element5 = document.getElementById("Bissue");
			element5.style.display="inline-block";
			element5.className="issue-visible btn btn-default btn-primary";

		}

		if (method=='issue'){	
	
			element1 = document.getElementById("Titre");
			element1.innerHTML="Projet : "+Nom_du_projet+" : "+Nom_issue;
			
			element2 = document.getElementById("Cretour");
			element2.innerHTML=" Autres issues";

			method_retour="project";
		
		}

};

//Gestion du bouton retour
function return1(){

	erase_DOM_part_and_edit("BTable");
	loadTable(method_retour,id_retour);

}


