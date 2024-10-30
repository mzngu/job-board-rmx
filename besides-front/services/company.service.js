import { tokenService } from './token.service.js';
import { Company } from '../models/company.model.js';

class CompanyService {
	constructor() {
		this.COMPANY_ENDPOINT = 'https://job.jiko-soft.com/company';
		this.httpHeaders = {
			'Content-Type': 'application/json',
		};
	}

	_getHeadersWithAuth() {
		const token = tokenService.getToken();
		return {
			...this.httpHeaders,
			Authorization: `Bearer ${token}`
		};
	}

	async getCompaniesBySearch(searchTerm) {
		try {
			const response = await fetch(`${this.OFFER_ENDPOINT}/search?query=${encodeURIComponent(searchTerm)}`, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});
	
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch offers:', error.message);
		}
	}

	// Fetch all company
	async getAll() {
		try {
			const response = await fetch(this.COMPANY_ENDPOINT, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			const companiesResponse = await response.json();
			const companies = companiesResponse.map(companyData => new Company(
				companyData.id, 
				companyData.companyName, 
				companyData.legalStatus, 
				companyData.activitySector,
				this
			));

			return companies;
		} catch (error) {
			console.error('Unable to fetch company : ', error.message);
		}
	}

	// Fetch a company by ID
	async getCompanyById(id) {
		try {
			const response = await fetch(`${this.COMPANY_ENDPOINT}/${id}`, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch offer:', error.message);
		}
	}

	// Create a new company
	async create(formData) {
		try {
			const response = await fetch(this.COMPANY_ENDPOINT, {
				method: 'POST',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify(formData)
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to create company : ', error.message);
		}
	}

	// Update a company by ID
	async update(id, formdata) {
		try {
			const response = await fetch(`${this.COMPANY_ENDPOINT}/${id}`, {
				method: 'PUT',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify(formdata)
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to update company : ', error.message);
		}
	}

	// Delete a company by ID
	async deleteByID(id) {
		try {
			const response = await fetch(`${this.COMPANY_ENDPOINT}/${id}`, {
				method: 'DELETE',
				headers: this._getHeadersWithAuth()
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to delete company:', error.message);
		}
	}
}

export const companyService = new CompanyService();