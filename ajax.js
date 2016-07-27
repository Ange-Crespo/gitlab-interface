var Nom_du_projet="";
var Nom_issue="";
var method_retour="";
var id_retour=0;


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

function loadForm(method,id_project,iid_issue) {

	url_json='http://localhost/gitlab-interface/dibi_connect.php?method=issue&project_id='+id_project+'&issue_iid='+iid_issue;
	console.log(url_json);
};


//fonction quand on clique sur une ligne qui retourne l'ID du project en console
$("#BTable").on('click-row.bs.table', function (e, row, $element) {
		console.log("On clique");
		erase_DOM_part_and_edit("BTable");
		if (row.iid){                                             //Si c'est une issue
			
			console.log("On fait le loadform");
			console.log(Nom_issue);			
			Nom_issue=row.name;
			console.log(Nom_issue);
			loadForm('issue',row.project_id,row.iid);
			console.log(row);
			
		}  

		else {						     //si ce n'est pas une issue (avoir si on affine le truc)

			console.log("On fait le loadtable");
			console.log(Nom_du_projet);
			Nom_du_projet=row.name;
			console.log(Nom_du_projet);
			loadTable('project',row.id);
			console.log(row);
		}		
    	});

function erase_DOM_part_and_edit(Select_ID){
	
	var element1 = document.getElementById(Select_ID);
 
	// boucle tant qu'un enfant existe
		while (element1.firstChild) {
   		// le supprime
   			element1.removeChild(element1.firstChild);
		}
	var table = document.createElement('table');
	table.id="Table";
	element1.appendChild(table);
};


function gestion_contenue_vue(method){
		
		if (method=='projects'){

			element1 = document.getElementById("Titre");
			element1.innerHTML="Mes Projets";
		
			element2 = document.getElementById("Bretour");
			element2.style.display="none";
			

		}

		if (method=='project'){

			element1 = document.getElementById("Titre");
			element1.innerHTML="Projet : "+Nom_du_projet;
		
			element2 = document.getElementById("Bretour");
			element2.style.display="inline-block";
			element2.className="retour-visible btn btn-default";
			method_retour="projects";

			element3 = document.getElementById("Cretour");
			element3.innerHTML=" Autres Projets";
			
		}

};

function return1(){

	
	erase_DOM_part_and_edit("BTable");
	loadTable(method_retour,id_retour);

}
