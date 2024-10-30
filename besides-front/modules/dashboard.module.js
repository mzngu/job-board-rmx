import { authService } from '../services/auth.service.js';
import { userService } from '../services/user.service.js';
import { companyService } from '../services/company.service.js';
import { offerService } from '../services/offer.service.js';
import { domHelper } from '../helpers/dom.helper.js';
import { EDIT_SVG, DELETE_SVG, PROPERTIES_NAMES_MAPPING, MODAL_FIELDS } from '../helpers/constants.helper.js';

const companiesManagementButton = document.getElementById('companies-management');
const offersManagementButton = document.getElementById('offers-management');
const usersManagementButton = document.getElementById('users-management');
const newRessourceButton = document.getElementById('createButton');

const createCompany = document.getElementById('header-create-company');
const createOffers = document.getElementById('header-create-offers');
const usernameButton = document.getElementById('header-username');
const offersButton = document.getElementById('header-offers');

function createResourceTable(parentElement, resources) {
	parentElement.replaceChildren();
	const table = domHelper.createHTMLElement('table', {}, parentElement);

	//Table Head
	const tableHead = domHelper.createHTMLElement('thead', {}, table);
	const tableHeadRow = domHelper.createHTMLElement('tr', {}, tableHead);
	Object.keys(resources[0].getTableData()).forEach(key => domHelper.createHTMLElement('th', {}, tableHeadRow, PROPERTIES_NAMES_MAPPING[key]));
	domHelper.createHTMLElement('th', {}, tableHeadRow, 'Editer');
	domHelper.createHTMLElement('th', {}, tableHeadRow, 'Supprimer');

	//Table Body
	const tableBody = domHelper.createHTMLElement('tbody', {}, table);
	resources.forEach(resource => {
		const filterdResource = resource.getTableData();
		const tableBodyRow = domHelper.createHTMLElement('tr', {}, tableBody);
		Object.keys(filterdResource).forEach(key => domHelper.createHTMLElement('td', {}, tableBodyRow, filterdResource[key]));
		const editButton = domHelper.createHTMLElement('td', {}, tableBodyRow, EDIT_SVG);
		const deleteButton = domHelper.createHTMLElement('td', {}, tableBodyRow, DELETE_SVG);
		editButton.addEventListener('click', () => editModalFrame(resource));
		deleteButton.addEventListener('click', () => deleteResource(resource));
	});
}

async function deleteResource(resource) {
	const service = resource.getService();
	if(!service) return;

	const response = await service.deleteByID(resource.getId());
	if(response) await refreshData();
}

async function refreshData() {
	const services = { "Utilisateurs" : userService, "Entreprises" : companyService, "Offres" : offerService };
	try {
		const contentName = document.getElementById('content-name');
		const resourceName = contentName.textContent;
		const resources = await services[resourceName].getAll();
		if (!resources) return;

		const tableContainer = document.getElementById('content-table');
		createResourceTable(tableContainer, resources);
	} catch (error) {
		console.error(error);
	}
}

function editModalFrame(resource) {
	domHelper.deleteHTMLElement('editModal');
	const modalFrame = domHelper.createHTMLElement('div', { id: 'editModal', class: 'modal' }, document.body);
	const modalContent = domHelper.createHTMLElement('div', { class: 'modal-content' }, modalFrame);
	const closeModal = domHelper.createHTMLElement('span', { class: 'close' }, modalContent, '×');
	
	domHelper.createHTMLElement('h2', {}, modalContent, 'Edition');
	const modalForm = domHelper.createHTMLElement('form', { id: 'modalForm' }, modalContent);

	Object.keys(resource.getEditableData()).forEach(key => {
		domHelper.createHTMLElement('label', { for: key }, modalForm, PROPERTIES_NAMES_MAPPING[key]);
		domHelper.createHTMLElement('input', { type: 'text', id: key, name: key}, modalForm, resource[key]);
	});
	const formActions = domHelper.createHTMLElement('div', { class: 'form-actions' }, modalForm);
	const cancelButton = domHelper.createHTMLElement('button', { type: 'button' }, formActions, 'Annuler');
	domHelper.createHTMLElement('button', { type: 'submit' }, formActions, 'Modifier');

	closeModal.onclick = function() { modalFrame.style.display = 'none'; };
	cancelButton.onclick = function() { modalFrame.style.display = 'none'; };

	window.onclick = function(event) { 
		if (event.target == modalFrame) { modalFrame.style.display = 'none'; }
	};

	modalForm.onsubmit = async function(event) {
		modalFrame.style.display = 'none';
		event.preventDefault();

		const formData = new FormData(modalForm);
		const data = {}
		formData.forEach((value, key) => data[key] = value);

		const service = resource.getService();
		const response = await service.update(resource.getId(), data);
		if(response) refreshData();
	};
}

function createModalFrame(resourceName) {
	domHelper.deleteHTMLElement('createModal');
	const modalFrame = domHelper.createHTMLElement('div', { id: 'createModal', class: 'modal' }, document.body);
	const modalContent = domHelper.createHTMLElement('div', { class: 'modal-content' }, modalFrame);
	const closeModal = domHelper.createHTMLElement('span', { class: 'close' }, modalContent, '×');

	domHelper.createHTMLElement('h2', {}, modalContent, resourceName);
	const modalForm = domHelper.createHTMLElement('form', { id: 'modalForm' }, modalContent);

	MODAL_FIELDS[resourceName].forEach(field => {
		domHelper.createHTMLElement('label', { for: field.id }, modalForm, field.label);
		if (field.type === 'select') {
			const select = domHelper.createHTMLElement('select', { id: field.id, name: field.name }, modalForm);
			field.options.forEach(option => domHelper.createHTMLElement('option', { value: option.value }, select, option.label));
		}
		else domHelper.createHTMLElement('input', { type: field.type, id: field.id, name: field.name, required: 'true' }, modalForm);
	});

	const formActions = domHelper.createHTMLElement('div', { class: 'form-actions' }, modalForm);
	domHelper.createHTMLElement('button', { type: 'submit' }, formActions, 'Créer');
	const cancelButton = domHelper.createHTMLElement('button', { type: 'button' }, formActions, 'Annuler');

	closeModal.onclick = function() { modalFrame.style.display = 'none'; };
	cancelButton.onclick = function() { modalFrame.style.display = 'none'; };

	window.onclick = function(event) { 
		if (event.target == modalFrame) { modalFrame.style.display = 'none'; }
	};

	modalForm.onsubmit = async function(event) {
		const services = { "Utilisateurs" : userService, "Entreprises" : companyService, "Offres" : offerService };
		modalFrame.style.display = 'none';
		event.preventDefault();

		const formData = new FormData(modalForm);
		const data = {}
		formData.forEach((value, key) => data[key] = value);

		const response = await services[resourceName].create(data);
		if(response) refreshData();
	};
}

async function switchResource(resourceName) {
	const services = { "Utilisateurs" : userService, "Entreprises" : companyService, "Offres" : offerService };
	try {
		const pageInformations = document.getElementById('page-name');
		const contentTitle = document.getElementById('content-name');
		pageInformations.textContent = `Gestion ${resourceName.toLowerCase()}`;
		contentTitle.textContent = resourceName;

		const resources = await services[resourceName].getAll();
		if (!resources) return;

		const tableContainer = document.getElementById('content-table');
		newRessourceButton.removeAttribute("hidden");
		createResourceTable(tableContainer, resources);
	} catch(error) {
		console.log(error);
	}
}

window.addEventListener('DOMContentLoaded', async () => {
	if (!authService.isAuthenticated()) {
		window.location.href = '/besides-front/views/signin/signin.html';
		return;
	}
	if(!authService.isAuthorized()) {
		window.location.href = '/besides-front/views/offers/offers.html';
		return;
	}
	
	const currentUser = JSON.parse(userService.getUser());
	if (currentUser) {
		const username = document.getElementById('header-username');
		username.textContent = `${currentUser.firstname} ${currentUser.lastname}`;
	}
});

newRessourceButton.addEventListener('click', async () => {
	const contentTitle = document.getElementById('content-name');

	if(!contentTitle.textContent) return;
	createModalFrame(contentTitle.textContent);
});

// Switch the resource & create the table
companiesManagementButton.addEventListener('click', async () => switchResource('Entreprises'));
usersManagementButton.addEventListener('click', async () => switchResource('Utilisateurs'));
offersManagementButton.addEventListener('click', async () => switchResource('Offres'));

createCompany.addEventListener('click', () => window.location.href = '/besides-front/views/companies/companies.html');
usernameButton.addEventListener('click', () => window.location.href = '/besides-front/views/profile/profile.html');
createOffers.addEventListener('click', () => window.location.href = '/besides-front/views/publish/publish.html');
offersButton.addEventListener('click', () => window.location.href = '/besides-front/views/offers/offers.html');