export class Offer {
	constructor(offerID, title, companyName, libelle, postedAt, jobType, workingTime, contractType, salary, adress, zipCode, country, city, applicantIDs, service) {
		this.offerID = offerID,
		this.title = title,
		this.companyName = companyName,
		this.libelle = libelle,
		this.postedAt = postedAt,
		this.jobType = jobType,
		this.workingTime = workingTime,
		this.contractType = contractType,
		this.salary = salary,
		this.adress = adress,
		this.zipCode = zipCode,
		this.country = country,
		this.city = city,
		this.applicantIDs = applicantIDs,
		this.service = service
	}

	getTableData() {
		return { offerID : this.offerID, title : this.title, contractType : this.contractType };
	}

	getEditableData() {
		return { title : this.title, contractType : this.contractType };
	}

	getService() {
		return this.service;
	}

	getId() {
		return this.offerID;
	}
}