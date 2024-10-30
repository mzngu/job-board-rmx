import { authService } from '../services/auth.service.js';
import { userService } from '../services/user.service.js';
import { companyService } from '../services/company.service.js';
import { tokenService } from '../services/token.service.js';

const createCompanyForm = document.getElementById('create-company-form');

const createOffers = document.getElementById('header-create-offers');
const usernameButton = document.getElementById('header-username');
const offersButton = document.getElementById('header-offers');
const signoutButton = document.getElementById('signout');

window.addEventListener('DOMContentLoaded', async () => {
	if (!authService.isAuthenticated()) {
		window.location.href = '/besides-front/views/signin/signin.html';
		return;
	}
	
	const currentUser = JSON.parse(userService.getUser());
	if (currentUser) {
		const username = document.getElementById('header-username');
		username.textContent = `${currentUser.firstname} ${currentUser.lastname}`;
	}
});

createCompanyForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const companyName = document.getElementById('companyName').value;
	const legalStatus = document.getElementById('legalStatus').value;
	const activitySector = document.getElementById('activitySector').value;

	try {
		const createForm = {companyName, legalStatus, activitySector}
		const creationResponse = await companyService.create(createForm);
		console.log(creationResponse);

		window.location.href = '/besides-front/views/offers/offers.html';
	} catch (error) {
		console.log(error.message);
	}
});

signoutButton.addEventListener('click', function() {
    tokenService.destroySession();
    userService.destroySession();
    
	window.location.href = '/besides-front/views/signin/signin.html';
});

usernameButton.addEventListener('click', () => window.location.href = '/besides-front/views/profile/profile.html');
createOffers.addEventListener('click', () => window.location.href = '/besides-front/views/publish/publish.html');
offersButton.addEventListener('click', () => window.location.href = '/besides-front/views/offers/offers.html');