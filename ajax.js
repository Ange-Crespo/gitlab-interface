//Variables globales
var Nom_du_projet="";
var Nom_issue="";
var method_retour="";
var id_retour=0;
var id_projet_mem;
var id_issue_mem;

//Fonction qui charge les tableaux et qui se lance lorsqu'on charge la page avec la method "projects"
function loadTable(method,id) {

	var url_json;

	var fields={field1:{locate:"",namee:"",visible:false}, field2:{locate:"",namee:"",visible:false}, field3:{locate:"",namee:"",visible:false}, field4:{locate:"",namee:"",visible:false},field5:{locate:"",namee:"",visible:false},field6:{locate:"",namee:"",visible:false},field7:{locate:"",namee:"",visible:false},field8:{locate:"",namee:"",visible:false}};
	gestion_contenue_vue(method);

	if (method=='projects'){

		url_json='http://localhost/gitlab-interface/get.php?method=projects';
		
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
		
		url_json='http://localhost/gitlab-interface/get.php?method=project&project_id='+id;
		
		id_projet_mem=id;

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
function loadIssue(method,id_project,id_issue) {

	$("#BTable").load('IssueView.html', function( response, status, xhr ) {
  		if ( status == "error" ) {
   			var msg = "Sorry but there was an error: ";
    			$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
 		}
	});

	gestion_contenue_vue(method);
	var url_json='http://localhost/gitlab-interface/get.php?method=issue&project_id='+id_project+'&issue_id='+id_issue;
	var url_json_notes='http://localhost/gitlab-interface/get.php?method=notes&project_id='+id_project+'&issue_id='+id_issue;
	id_issue_mem=id_issue;
	console.log(url_json);
	console.log(url_json_notes);
 	$.getJSON( url_json, function( json ) {//on a le json du projet
				
		disp_button(json);
		disp_title(json);
		disp_description(json);
		disp_commentaires(json);

 	});

	$.getJSON( url_json_notes, function( json_notes ) {//on a le json du projet
				
		
		disp_commentaires(json_notes);

 	}); 
};

function disp_button(json){

	var Module = json.milestone.title;
	var labels = json.labels;
	var state = json.state2;
	var class_state = 'btn dropdown-toggle btn-state-'+state;
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
	buttonState.innerHTML=state;
	buttonState.className=class_state;
	
	console.log(buttonModule);
	console.log(buttonVersion_issue);
	console.log(buttonVersion_resolved);

	return true;

};

function equi_state(state){

	var struc={

    			opened: 'Open',
			reopened: 'Reopen',
			resolved: 'Resolved',
    			closed: 'Close',
			paid : 'Paid',
			delivered : 'Delivered',
			wont: "Won't fix",
			invalid: 'Invalid',
			
	};

	state=struc[state];
	return state;

}

function disp_title(json){

	var Titre_issue=json.title;
	var Num_issue=json.iid;
	var Author=json.author.name;
	var Date_issue=json.created_at2;

	var Z_Num_issue=document.getElementById('number');
	var Z_Titre_issue=document.getElementById('name');
	var Z_Author=document.getElementById('author');
	var Z_Date_issue=document.getElementById('time');

	Z_Num_issue.innerHTML="#"+Num_issue;
	Z_Titre_issue.innerHTML="&nbsp"+Titre_issue+"&nbsp";
	Z_Author.innerHTML="by&nbsp" +Author+",&nbsp";
	Z_Date_issue.innerHTML=Date_issue;

}

function disp_description(json){

	var description=json.description;
	
	
	var Z_Description=document.getElementById('description');

	Z_Description.innerHTML=description;

}

function disp_commentaires(json){

	var j=1;
	var Cvide=true;
	var coms=json.list;
	console.log(coms);
	var Table=document.getElementById('Com-body');
	for (var i = 0, c = coms.length; i < c; i++){
	
		if (coms[i].author.name!="Administrator"){
			tr=document.createElement('tr');
			j=j+1;
			tr.id=coms[i].id;;
			
			td=document.createElement('td');

			h4=document.createElement('h4');
			h4.className="Titre_issue";

			h5=document.createElement('h5');
			h5.className="Titre_issue";

			p=document.createElement('p');
		
			console.log(coms[i]);
			p.innerHTML=coms[i].body;
			h4.innerHTML=coms[i].author.name+" ";
			h5.innerHTML="&nbsp(&nbsp"+coms[i].created_at2+"&nbsp)";

			// On met tout ensemble

			td.appendChild(h4);
			td.appendChild(h5);
			td.appendChild(p);

			tr.appendChild(td);

			Table.appendChild(tr);
			Cvide=false;
		}
		
		if (Cvide){
			tr=document.createElement('tr');
			j=j+1;
			tr.id="Commentaire-"+j;
			
			td=document.createElement('td');

			h4=document.createElement('h4');
			h4.className="Titre_issue";

			h5=document.createElement('h5');
			h5.className="Titre_issue";

			p=document.createElement('p');
		
			console.log(coms[i]);
			p.innerHTML="Il n'y a pas encore de commentaire";
			h4.innerHTML="Soyez le premier à commenter";
			h5.innerHTML="(maintenant)";

			// On met tout ensemble

			td.appendChild(h4);
			td.appendChild(h5);
			td.appendChild(p);

			tr.appendChild(td);

			Table.appendChild(tr);
			Cvide=false;
			
		}
	}

}

function loadEdit(id_project,id_issue){

	console.log(id_project);
	console.log(id_issue);

	$("#BTable").load('edit.php', function( response, status, xhr ) {
  		if ( status == "error" ) {
   			var msg = "Sorry but there was an error: ";
    			$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
 		}
	});

	var url_json='http://localhost/gitlab-interface/get.php?method=issue&project_id='+id_project+'&issue_id='+id_issue;

	$.getJSON( url_json, function( json ) {//on a le json de l'issue
			
		document.getElementById("Title").value=json.title;
		document.getElementById("description_Edit").value=json.description;
		selected=json.assignee.name;
		
		usersDOM=document.getElementById("user")
		
		ListSmth(usersDOM,id_project,"members",selected);

	
		selected2=json.milestone.title;

		modulesDOM=document.getElementById("module");
			
		ListSmth(modulesDOM,id_project,"modules",selected2);
		
		
		document.getElementById("version_detectee").value=json.version_issue[0];
		document.getElementById("version_resolue").value=json.version_resolved[0];
		document.getElementById("module").value=json.milestone.title;
		document.getElementById("module").value=json.milestone.title;
		
		document.getElementById("type").value=equi_type(json.type2);
		document.getElementById("type").innerHTML=json.type2;
		
 	});
	
}

function equi_type(type){

	var struc={

    			bug: 'Bug/Issue',
			amelioration: 'Amélioration',
			
	};

	type=struc[type];
	return type;

}

function ListSmth(partDOM,id_project,method,selected){

		var ask;

	if (method=="members"){

		ask="name";		
	
	}

	else if (method=="modules"){
		
		ask="title";

	}

	url_json='http://localhost/gitlab-interface/get.php?method='+method+'&project_id='+id_project;
	
	$.getJSON( url_json, function( json ) {
	
		for (var i=0; i<json.size; i++){
			
			option=document.createElement("option");
			option.value=json.list[i].id;
			option.innerHTML=json.list[i][ask];
			if (selected==json.list[i][ask]){

				option.selected=true;
			
			}
			partDOM.appendChild(option);

		}
	
	});
	
}

//fonction quand on clique sur une ligne qui retourne l'ID du project ou de l'issue
$("#BTable").on('click-row.bs.table', function (e, row, $element) {

		console.log("On clique");
		erase_DOM_part_and_edit("BTable");
		if (row.iid){                                             //Si c'est une issue
			erase_DOM("BTable");
			console.log("On fait le loadIssue");
			console.log(Nom_issue);
			Nom_issue=row.title;
			console.log(Nom_issue);
			loadIssue('issue',row.project_id,row.id);
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

//En fonction du moment où on se trouve, gestion de la vue sauf pour le Issue pour simplifier.
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

$('form').on('submit', function() {
  // call functions to handle form
  return false;
});



function update_issue(){

	console.log(id_projet_mem);
	console.log(id_issue_mem);
	var Title = $("#Title").val();
	
	var description = $("#description_Edit").val();
	var assignee = $("#user").val();
	
	var module = $("#module").val();
	var version_issue = $("#version_detectee").val();
	var version_resolue = $("#version_resolue").val();
	var type = $("#type").val();	
	postActionData = '{"Title":' + Title + ',"description":"'+ description + '","assignee":' + assignee + ',"module":{"id":'+ module + ',},"version_issue":"#vi ' + version_issue + '","version_resolue":"#vr ' + version_resolue+ '","type":"'+type+'",}';
	console.log(postActionData);
	/*
	$.ajax({
		method: "PUT",
 		 url: "http://localhost/gitlab-interface/update.php?methode=issue&project_id="+project_id+"&issue_id="+issue_id,
  		data: { name: "John"}
	})
  	.done(function( msg ) {
    	alert( "Data Saved: " + msg );
  	});*/
	//return1();
}

//Gestion du bouton retour
function return1(){
	
	console.log("return");
	erase_DOM_part_and_edit("BTable");
	loadTable(method_retour,id_retour);

}


