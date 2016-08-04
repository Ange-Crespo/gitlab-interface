<div>
	<!--<form method="post" onsubmit="return update_issue();">-->
		<table class="table no-border">

			<tr>
				<td>Titre: </td>
				<td><input type="text" id="Title" maxlength="45" required/></td>
			</tr>

			<tr>
				<td>Description:</td>
				<td><textarea type="text" id="description_Edit" /></td>
			</tr>

			<tr>
				<td>Assignee</td>
				<td>

					<select id="user">

						<!-- Le js rempli cette partie -->				
										
					</select>

				</td>
			</tr>
		
			<tr>
				<td>Module</td>

				<td>

					<select id="module">

						<!-- Le js rempli cette partie -->	
															
					</select>

				</td>

			</tr>

			<tr>
			
				<td>Version détectée</td>
				<td><input type="text" maxlength="15" id="version_detectee"></td>
		
				<td>Version résolue</td>
				<td><input type="text" maxlength="15" id="version_resolue"></td>
			</tr>
	
			<tr>
				<td>Type</td>
				
				<td><input type="text" maxlength="15" id="type" list="types" autocomplete="on">
					
					<datalist id="types">

						<option value="bug">Bug/Issue</option>

						<option value="amelioration">Amélioration</option>
															
					</datalist>

				</td>

			</tr>
											
			<tr>
				<td colspan="2" style="text-align: center;">
				<input type="submit" onclick="update_issue()" value="Editer"/></td>
			</tr>

		</table>
	<!--</form>-->
</div>
