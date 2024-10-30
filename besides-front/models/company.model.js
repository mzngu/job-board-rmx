export class Company {
	constructor(id, companyName, legalStatus, activitySector, service) {
		this.id = id,
		this.companyName = companyName,
		this.legalStatus = legalStatus,
		this.activitySector = activitySector,
		this.service = service
	}

	getTableData() {
		return {
			id : this.id,
			companyName : this.companyName,
			legalStatus : this.legalStatus,
			activitySector : this.activitySector
		};
	}

	getEditableData() {
		return { companyName : this.companyName, legalStatus : this.legalStatus, activitySector : this.activitySector };
	}

	getService() {
		return this.service;
	}

	getId() {
		return this.id;
	}
}