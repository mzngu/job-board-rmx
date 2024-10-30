import { tokenService } from '../services/token.service.js';
import { userService } from '../services/user.service.js';
import { authService } from '../services/auth.service.js';
import { domHelper } from '../helpers/dom.helper.js';
import { companyService } from '../services/company.service.js';

const editProfileForm = document.getElementById('edit-profile-form');
const signoutButton = document.getElementById('signout');

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-bar');

const createCompany = document.getElementById('header-create-company');
const createOffers = document.getElementById('header-create-offers');
const usernameButton = document.getElementById('header-username');
const offersButton = document.getElementById('header-offers');

function populateFieldsValue(user) {
	document.getElementById('username').value = user.username || '';
	document.getElementById('firstName').value = user.firstname || '';
	document.getElementById('lastName').value = user.lastname || '';
	document.getElementById('phoneNumber').value = user.phoneNumber || '' || '';
	document.getElementById('address').value = user.address || '';
	document.getElementById('zipCode').value = user.zipCode || '';
	document.getElementById('city').value = user.city || '';
	document.getElementById('country').value = user.country || '';
}

function createCompanyFrames(parentElement, companies) { // todo barre de recherche d'entreprises
	if (parentElement) parentElement.replaceChildren();

	companies.forEach(company => {
		const companyElement = domHelper.createHTMLElement('div', {class: 'company'}, parentElement);

		domHelper.createHTMLElement('div', {class: 'company-name'}, companyElement, company.companyName);

		companyTags.forEach(companyTag => {
			if (companyTag) {
				domHelper.createHTMLElement('div', {class: 'tag'}, tagsContainer, companyTag);
			}
		});

		companyElement.addEventListener('click', function() {
			console.log(company.title);
		});
	});
}

async function handleSearchResults(searchValue) {
	const companyContainer = document.getElementById('companies-container');
	const companies = await companyService.getCompaniesBySearch(searchValue);
	createCompanyFrames(companyContainer, companies);
}

searchButton.addEventListener('click', async function() {
	handleSearchResults(searchInput.value);
});

searchInput.addEventListener('keypress', async function(event) {
	if (event.key !== 'Enter') return;

	handleSearchResults(searchInput.value);
});

window.addEventListener('DOMContentLoaded', async () => {
	if (!authService.isAuthenticated()) {
		window.location.href = '/besides-front/views/signin/signin.html';
		return;
	}

	const currentUser = JSON.parse(userService.getUser());
	if (currentUser) {
		const username = document.getElementById('header-username');
		const title = document.getElementById('edit-profile-title');
		username.textContent = title.textContent =`${currentUser.firstname} ${currentUser.lastname}`;

		if(currentUser.isAdmin) {
			const navigationContainer = document.getElementById('navigation-container');
			domHelper.createHTMLElement('div', {class: 'spacer'}, navigationContainer, '|');
			const itemContainer = domHelper.createHTMLElement('div', {class: 'item-container'}, navigationContainer);
			const dashboardButton = domHelper.createHTMLElement('span', {id: 'header-dashboard'}, itemContainer, "Dashboard");
			dashboardButton.addEventListener('click', function() {
				window.location.href = '/besides-front/views/dashboard/dashboard.html';
			});
		}
	}

	const user = await userService.getUserById(currentUser.userID);
	if (!user) return;

	populateFieldsValue(user);
});

editProfileForm.addEventListener('submit', async function(event) {
	event.preventDefault();

	const currentUser = JSON.parse(userService.getUser());
	if (currentUser) {
		const fields = ['username', 'firstName', 'lastName', 'phoneNumber', 'address', 'zipCode', 'city', 'country'];
		const editForm = fields.reduce((form, field) => {
			const value = document.getElementById(field).value || '';
			if (value) form[field] = value;
			return form;
		}, {});
		const editResponse = await userService.update(currentUser.userID, editForm);
	}
});

signoutButton.addEventListener('click', function() {
    tokenService.destroySession();
    userService.destroySession();
    
	window.location.href = '/besides-front/views/signin/signin.html';
});
createCompany.addEventListener('click', () => window.location.href = '/besides-front/views/companies/companies.html');
usernameButton.addEventListener('click', () => window.location.href = '/besides-front/views/profile/profile.html');
createOffers.addEventListener('click', () => window.location.href = '/besides-front/views/publish/publish.html');
offersButton.addEventListener('click', () => window.location.href = '/besides-front/views/offers/offers.html');