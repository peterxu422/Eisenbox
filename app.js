window.onload = function() {
	// TODO: App Code goes here. Code here executes when the page loads

	// Have access to todoDB b/c db.js file is loaded before app.js
	// Display the todo items
	todoDB.open(refreshTodos);

	// Get references to the form elements
	var newTodoForm = document.getElementById('new-todo-form');
	var newTodoInput = document.getElementById('new-todo');

	var newTodoFormQ1 = document.getElementById('new-todo-form-q1');
	var newTodoInputQ1 = document.getElementById('new-todo-q1');
	
	var newTodoFormQ2 = document.getElementById('new-todo-form-q2');
	var newTodoInputQ2 = document.getElementById('new-todo-q2');

	var newTodoFormQ3 = document.getElementById('new-todo-form-q3');
	var newTodoInputQ3 = document.getElementById('new-todo-q3');

	var newTodoFormQ4 = document.getElementById('new-todo-form-q4');
	var newTodoInputQ4 = document.getElementById('new-todo-q4');
	
	init();
	$("#todo-q1-items").droppable({
		drop: function(e, ui) {
			var item = ui.draggable[0];
			var timestamp = parseInt(item.id.substring(5), 10); // 'todo-[timestamp]'
			todoDB.changeQuad(timestamp, 1, refreshTodos);
		}
	});

	$("#todo-q2-items").droppable({
		drop: function(e, ui) {
			var item = ui.draggable[0];
			var timestamp = parseInt(item.id.substring(5), 10); // 'todo-[timestamp]'
			todoDB.changeQuad(timestamp, 2, refreshTodos);
		}
	});

	$("#todo-q3-items").droppable({
		drop: function(e, ui) {
			var item = ui.draggable[0];
			var timestamp = parseInt(item.id.substring(5), 10); // 'todo-[timestamp]'
			todoDB.changeQuad(timestamp, 3, refreshTodos);
		}
	});

	$("#todo-q4-items").droppable({
		drop: function(e, ui) {
			var item = ui.draggable[0];
			var timestamp = parseInt(item.id.substring(5), 10); // 'todo-[timestamp]'
			todoDB.changeQuad(timestamp, 4, refreshTodos);
		}
	});

	// Handle new todo item form submissions.
	newTodoForm.onsubmit = function() {
		// Get the todo text.
		var text = newTodoInput.value;

		// Check to make sure the text is not blank (or just spaces).
		if(text.replace(/ /g, '') != '') {
			// Create the todo item.
			// Passing callback func that executes refreshTodos to update UI when new item saved
			todoDB.createTodo(text, 0, function(todo) {
				refreshTodos();
			});
		}

		// Reset the input field.
		newTodoInput.value = '';

		// Don't send the form. QUES: Why??
		return false;
	}

	newTodoFormQ1.onsubmit = function() {
		// Get the todo text.
		var text = newTodoInputQ1.value;

		// Check to make sure the text is not blank (or just spaces).
		if(text.replace(/ /g, '') != '') {
			// Create the todo item.
			// Passing callback func that executes refreshTodos to update UI when new item saved
			todoDB.createTodo(text, 1, function(todo) {
				refreshTodos();
			});
		}

		// Reset the input field.
		newTodoInputQ1.value = '';

		// Don't send the form. QUES: Why??
		return false;
	}	

	newTodoFormQ2.onsubmit = function() {
		// Get the todo text.
		var text = newTodoInputQ2.value;

		// Check to make sure the text is not blank (or just spaces).
		if(text.replace(/ /g, '') != '') {
			// Create the todo item.
			// Passing callback func that executes refreshTodos to update UI when new item saved
			todoDB.createTodo(text, 2, function(todo) {
				refreshTodos();
			});
		}

		// Reset the input field.
		newTodoInputQ2.value = '';

		// Don't send the form. QUES: Why??
		return false;
	}

	newTodoFormQ3.onsubmit = function() {
		// Get the todo text.
		var text = newTodoInputQ3.value;

		// Check to make sure the text is not blank (or just spaces).
		if(text.replace(/ /g, '') != '') {
			// Create the todo item.
			// Passing callback func that executes refreshTodos to update UI when new item saved
			todoDB.createTodo(text, 3, function(todo) {
				refreshTodos();
			});
		}

		// Reset the input field.
		newTodoInputQ3.value = '';

		// Don't send the form. QUES: Why??
		return false;
	}

	newTodoFormQ4.onsubmit = function() {
		// Get the todo text.
		var text = newTodoInputQ4.value;

		// Check to make sure the text is not blank (or just spaces).
		if(text.replace(/ /g, '') != '') {
			// Create the todo item.
			// Passing callback func that executes refreshTodos to update UI when new item saved
			todoDB.createTodo(text, 4, function(todo) {
				refreshTodos();
			});
		}

		// Reset the input field.
		newTodoInputQ4.value = '';

		// Don't send the form. QUES: Why??
		return false;
	}
};

function init() {
	$("#todo-items").sortable();
	$("#todo-q1-items").sortable();
	$("#todo-q2-items").sortable();
	$("#todo-q3-items").sortable();
	$("#todo-q4-items").sortable();
}

function printDB() {
	todoDB.fetchTodos(function(todos) {
		console.log(todos.toString());
	});
}

// Update the list of todo items.
function refreshTodos() {
	// fetchTodos executes. The callback gets passed an array of todo items
	todoDB.fetchTodos(function(todos) {

		var todoList = document.getElementById("todo-items");
		var todoListQ1 = document.getElementById("todo-q1-items");
		var todoListQ2 = document.getElementById("todo-q2-items");
		var todoListQ3 = document.getElementById("todo-q3-items");
		var todoListQ4 = document.getElementById("todo-q4-items");

		todoList.innerHTML = '';
		todoListQ1.innerHTML = '';
		todoListQ2.innerHTML = '';
		todoListQ3.innerHTML = '';
		todoListQ4.innerHTML = '';

		for(var i=0; i < todos.length; i++) {
			// Read the todo items backwards (most recent first).
			var todo = todos[(todos.length -1 -i)];
			var li = document.createElement('li');
			li.id = "todo-" + todo.timestamp;
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.className = "todo-checkbox";
			checkbox.setAttribute("data-id", todo.timestamp);

			li.appendChild(checkbox);

			var span = document.createElement('span');
			span.innerHTML = todo.text;

			li.appendChild(span);

			switch(todo.quadrant) {
				case 0: 	todoList.appendChild(li);
							break;
				case 1: 	todoListQ1.appendChild(li);
							break;
				case 2: 	todoListQ2.appendChild(li);
							break;
				case 3: 	todoListQ3.appendChild(li);
							break;
				case 4: 	todoListQ4.appendChild(li);
							break;
			}

			// Setup an event listener for each checkbox.
			checkbox.addEventListener('click', function(e) {
				var id = parseInt(e.target.getAttribute('data-id'));

				todoDB.deleteTodo(id, refreshTodos);
			});
		}
	});
}