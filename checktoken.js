
	var url_json='http://localhost/gitlab-interface/checkToken.php?method=listcheck';
	var $table = $('#table');
        $remove = $('#remove');

	window.operateEvents = {
        'click .modify': function (e, value, row, index) {
            alert("Copiez le nom de l'utilisateur son mot de passe sera : 'admin123'"); //8081 on the server
        },
        'click .remove': function (e, value, row, index) {
            $table.bootstrapTable('remove', {
                field: 'id',
                values: [row.id]
            });
        }
    };

	$('#table').bootstrapTable(

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
			
    				columns: [{
				
        					field: 'login_user',
						align: 'center',
       						title: 'Name'

    					},{

        					field: 'token_gitlab',
						align: 'center',        					
						title: 'Token',
						  editable: {

                            				type: 'text',
                            				title: 'Token',
                           			 	validate: function (value) {
                                			value = $.trim(value);

                                			if (!value) {

                                    				return 'This field is required';

                               	 			}

                                			
							
                                			var data = $table.bootstrapTable('getData'),
                                    			index = $(this).parents('tr').data('index');
                                			console.log(data[index].id);
							post_token(value,data[index].id);
                                			return '';
							}
                            			}
					}, 
					{

        					field: 'test_token',
						align: 'center',
        					title: 'Status',
						formatter: statusFormatter

    					},
					{

        					field: 'operate',
        					title: 'Reset',
						align: 'center',
						events: operateEvents,
						formatter: operateFormatter

    					}]
		
		});


	function operateFormatter(value, row, index) {
        	return [
            		'<a class="modify" href="http://localhost:8080/" target="_blank" title="Like">',
            			'<i class="glyphicon glyphicon-wrench"></i>',
            		'</a>  ',
            		
        	].join('');
    }


	function statusFormatter(value, row, index) {
        	if (value==true){
	
			return [

            			'<a class="valid" href="javascript:void(0)" title="Valid">',
            				'<i class="glyphicon glyphicon-ok" style="color:green"></i>',
            			'</a>  ',
            		
        		].join('');

		}

		else{

			return [

            			'<a class="invalid" href="javascript:void(0)" title="Invalid">',
            				'<i class="glyphicon glyphicon-remove" style="color:red"></i>',
            			'</a>  ',
            		
        		].join('');

		}
    }

function post_token(value,id){


	$.ajax({
		method: "POST",
		url: "http://localhost/gitlab-interface/postToken.php?method=token&value="+value+"&id="+id,
		processData: false,
 		
		//contentType: 'application/json; charset=utf-8',
   		//dataType: 'json',
    		
		success: function(msg) {
        		//alert(JSON.stringify(msg));
			console.log(JSON.stringify(msg));
   		 }
		
	})

}
//SdruySSr_eEPVbpCNxoB
