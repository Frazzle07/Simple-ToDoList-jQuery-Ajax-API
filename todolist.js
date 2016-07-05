function getPosts() {
	//Ajax request to receive a list of tasks from the user with an ID of 1
	$.ajax('http://jsonplaceholder.typicode.com/users/1/todos', {
	  method: 'GET'
	}).done(function(data) {
		//If the request is successful the for loop goes through each object return and using it's data, creates a new row and appends it to the exisitng table.
		//The new row displays the ID of the task and the title of the task.
		for (var i = 0; i < data.length; i++) {
			$(".task-table").append("<tr class='"+data[i]['id']+"'><th>"+data[i]['id']+"</th><td><input type='checkbox' class='checkbox'></td><td>"+data[i]['title']+"</td><td><button type='button' class='btn btn-delete btn-danger'>X</button></td></tr>");
		};
	});
}

$( document ).ready(function() {
	//When the add tasks button is pressed...
	$(".add-task").submit(function(e) {
		//Stops the form submitting and reloading the page
		e.preventDefault();
		//Stores the user entered input into a variable
		var title = $('input[name=title]').val();
		//Ajax request to post the data using the enter data from the user
		$.ajax('http://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			data: {
				title: title,
				userId: 1
			},
			//Disables the text input and button before starting the Ajax request
	  		beforeSend: function() { 
		  		$(".btn-add").prop('disabled', true);
		  		$(".txt-add").prop('disabled', true);
		  	}
		}).done(function(data) {
			//After success the id of the last row is stored so a new row can be appended and be in numerical order
	  		var id = parseInt($(".task-table tr:last").attr('class'));
	  		//Incremented by one for new entry to table, to replicate the ID that would've been stored in the database.
	  		id++;
	  		//New row is appended to the table using the data entered by the user
			$(".task-table").append("<tr class='"+id+"'><th>"+id+"</th><td><input type='checkbox' class='checkbox'></td><td>"+data['title']+"</td><td><button type='button' class='btn btn-delete btn-danger'>X</button></td></tr>");
			//Re-enabeles the button now that the request is complete
			$(".btn-add").prop('disabled', false);
			$(".txt-add").prop('disabled', false);
		});
	});

	//Listener for a checkbox being pressed. Using the "on" method means that any newly added rows are captured by the listener
	$('.task-table').on('change', '[type="checkbox"]', function(){
		//If statement to see wherether or not the checkbox has been checked or unchecked by the click. If it has then a green colour will added, else nothing
		var color = this.checked ? '#dff0d8' : '';
		//Sets the background colour of the checked row
		$(this).parent().parent().css("background-color", color);
	});

	//Listener for when the delete button is pressed.
	$('.task-table').on('click', '.btn-delete', function(){
		//Gets id of deleted row for when deleteing it from the API
		var id = $(this).parent().parent().attr('class');
		//Ajax request to delete row
		$.ajax('http://jsonplaceholder.typicode.com/posts/'+id, {
		  method: 'DELETE'
		}).done(function(data) {
			console.log(data);
			//Once successful, the row is removed from the DOM
			$(".task-table > tr."+id).remove();
		});
	});
});
