export class User {
	constructor(userID, firstName, lastName, username, service) {
		this.userID = userID,
		this.firstName = firstName,
		this.lastName = lastName,
		this.username = username,
		this.service = service
	}

	getTableData() {
		return {
			userID : this.userID,
			firstName : this.firstName,
			lastName : this.lastName,
			username : this.username
		};
	}

	getEditableData() {
		return { firstName : this.firstName, lastName : this.lastName, username : this.username };
	}

	getService() {
		return this.service;
	}

	getId() {
		return this.userID;
	}
}