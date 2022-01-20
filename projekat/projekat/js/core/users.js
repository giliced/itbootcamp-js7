users = window.script || {};

users = {

	users: [],

	fields: {
		name: 'required',
		email: 'required',
		phone: 'required',
		location: 'required',
		profileImage: 'required',
		pricePerHour: 'required',
		tech: 'required',
		description: 'required',
		experience: 'required',
		nativeLanguage: 'required',
		linkedin: 'optional',
	},

	init: function(){
		this.getAllUsers();
	},

	getUserWithToken: function(token) {
		for(let user in this.users) {
			if(this.users[user].token === token) {
				return this.users[user];
			}
		}
		return;
	},

	updateUser: function(tokenId, newData) {
		for(let user in this.users) {
			if(this.users[user].token == tokenId) {

				let newFill = {};
				for(let userData in newData) {
					newFill[newData[userData].name] = newData[userData].value;
				}
				newFill.token = tokenId;
				newFill.hired = this.users[user].hired;
				this.users[user] = newFill;
				this.saveUsers();
				break;
			}
		}
	},

	getAllUsers: function() {
		let storageUsers = JSON.parse(localStorage.getItem("users"));
		if(storageUsers !== null) {
			this.users = storageUsers;
		}
		return this.users;
	},

	createUser: function(formData)
	{
		let user = {};

		for(let form in formData) {
			user[formData[form]['name']] = formData[form]['value'];
		}

		user['token'] = (Math.random() + 1).toString(36).substring(7);
		user['hired'] = [];

		this.users.push(user);
		this.saveUsers();
	},

	deleteUser: function(index) {
		this.users.splice(index, 1);
		this.saveUsers();
	},

	hireUser: function(token, from, to) {
		for(let user in this.users) {
			if(this.users[user].token === token) {
				if(!this.isHiredAtDate(user, from, to)) {
					this.markHired(this.users[user], from, to);
					alert("You have hired "+this.users[user].name);
				}
				else {
					alert(this.users[user].name+" is already hired at this date.");
				}
			}
		}
	},

	isHiredAtDate(userId, from, to) {
		for(let hiredDates in this.users[userId].hired) {
			let hiredAt = this.users[userId].hired[hiredDates];

			hiredAt.from = new Date(hiredAt.from);
			hiredAt.to = new Date(hiredAt.to);

			if((hiredAt.from.getTime() <= to.getTime() && hiredAt.from.getTime() >= from.getTime())) {
				return true;
			}

			if((hiredAt.to.getTime() <= to.getTime() && hiredAt.to.getTime() >= from.getTime())) {
				return true;
			}
		}
		return false;
	},

	saveUsers: function() {
		localStorage.setItem("users", JSON.stringify(this.users));
	},

	markHired: function(user, from, to) {
		user.hired.push({
			from: from,
			to: to,
		});
		users.saveUsers();
	},

	removeScheduleForUser: function(token, from, to) {
		for(let user in this.users) {
			let tempUser = this.users[user];
			for(let userHired in tempUser.hired) {
				if(tempUser.hired[userHired].from === from && tempUser.hired[userHired].to === to) {
					tempUser.hired.splice(userHired, 1);
					break;
				}
			}
		}
		this.saveUsers();
	}

}
