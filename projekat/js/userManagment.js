$(document).ready(function() {
	
	users.init();

	let tokenId = findGetParameter('tokenId');

	if(tokenId !== null) {
		let storageUsers = users.getAllUsers();
		for (let user in storageUsers) {
			if(tokenId === storageUsers[user].token) {
				fillFormWithData(storageUsers[user]);
				break;
			}
		}
	}

	$(document).on('click','#registerUser',function() {

		let formData = $("#registrationForm").serializeArray();
		let fieldsValid = formsValid(formData)

		if(fieldsValid) {
			users.createUser(formData);
			alert("You have created a new user. You will be redirected to homepage!");
			window.location.href = "index.html";
		}

		return false;
	});

	$(document).on('click','#editUser',function() {
		let formData = $("#registrationForm").serializeArray();
		let fieldsValid = formsValid(formData);
		resetErrors(formData);

		if(fieldsValid) {
			let developerToken = $(this).attr('data-developer-id');
			users.updateUser(developerToken, formData);
			alert("You have edited the developer details. You will be redirected to homepage.");
			window.location.href = "index.html";
		}
		return false;
	});

	function resetErrors(formData) {
		formData.forEach(function(input) {
			let fieldId = "#field_error_"+input.name;
			$(fieldId).text("");
		});
	}

	function formsValid(formData) {

		let fieldsValid = true;

		formData.forEach(function(input) {

			let inputValue = input.value.trim();
			let fieldValid = true;

			for(let field in users.fields) {
				if(field === input.name && users.fields[field] === "required" && inputValue === "") {
					fieldValid = false;
					fieldsValid = false;
				}
				if(!fieldValid) {
					let fieldId = "#field_error_"+input.name;
					$(fieldId).text("Field "+input.name+" cannot be empty!").prepend("<br/>");
				}
			}
		});
		return fieldsValid;
	}

	function fillFormWithData(formData) {
		for(let field in formData) {
			$("#"+field).val(formData[field]);
		}
		$("#registerUser")
			.attr('id', 'editUser')
			.attr('data-developer-id',formData.token)
			.text("Save");
	}

	function findGetParameter(parameterName) {
		var result = null,
			tmp = [];
		location.search
			.substr(1)
			.split("&")
			.forEach(function (item) {
				tmp = item.split("=");
				if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
			});
		return result;
	}


});