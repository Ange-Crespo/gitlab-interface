<div>
	
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
			<td><input type="text" maxlength="15" id="assignee" list="users">

				<datalist id="users">

					<!-- Le js rempli cette partie -->				
										
				</datalist>

			</td>
		</tr>
		
		<tr>
			<td>Module</td>
			<td><input type="text" maxlength="15" id="module" list="modules">

				<datalist id="modules">

					<!-- Le js rempli cette partie -->	
															
				</datalist>

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
			<td><input type="text" maxlength="15" id="type" list="types">
				<datalist id="types">

					<option>Bug/Issue</option>

					<option>Amélioration</option>
															
				</datalist>
			</td>
		</tr>
											
		<tr>
			<td colspan="2" style="text-align: center;">
			<input type="submit" value="Editer"/></td>
		</tr>

	</table>

</div>
