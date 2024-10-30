export const EDIT_SVG = '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.7071C19.9497 1.5355 18.0503 1.5355 16.8787 2.7071L15.1989 4.3868 7.2929 12.2928C7.1647 12.421 7.0738 12.5816 7.0299 12.7574L6.0299 16.7574C5.9447 17.0982 6.0445 17.4587 6.2929 17.707 6.5413 17.9554 6.9018 18.0553 7.2425 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.8586 21.2929 7.1213C22.4645 5.9497 22.4645 4.0502 21.2929 2.8786L21.1213 2.7071ZM18.2929 4.1213C18.6834 3.7307 19.3166 3.7307 19.7071 4.1213L19.8787 4.2928C20.2692 4.6834 20.2692 5.3165 19.8787 5.707L18.8622 6.7236 17.3068 5.1074 18.2929 4.1213ZM15.8923 6.5218 17.4477 8.138 10.4888 15.097 8.3744 15.6256 8.903 13.5112 15.8923 6.5218ZM4 7.9999C4 7.4477 4.4477 6.9999 5 6.9999H10C10.5523 6.9999 11 6.5522 11 5.9999 11 5.4477 10.5523 4.9999 10 4.9999H5C3.3432 4.9999 2 6.3431 2 7.9999V18.9999C2 20.6568 3.3432 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999 17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.4477 19.9999 4 19.5522 4 18.9999V7.9999Z" fill="#000000"/></svg>';
export const DELETE_SVG = '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M6 7H12 18V18C18 19.6569 16.6569 21 15 21H9C7.3431 21 6 19.6569 6 18V7ZM9 5C9 3.8954 9.8954 3 11 3H13C14.1046 3 15 3.8954 15 5V7H9V5Z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export const PROPERTIES_NAMES_MAPPING = {
	"userID" : "Id",
	"firstName" : "Prénom",
	"lastName" : "Nom",
	"username" : "E-mail",

	"id" : "Id",
	"companyName": "Entreprise",
    "legalStatus": "Statut legal",
    "activitySector": "Secteur d'activité",

	"offerID": "Id",
    "title": "Offre",
	"contractType": "Contrat"
}
const userFields = [
	{ label: 'Nom', type: 'text', id: 'lastName', name: 'lastName' },
	{ label: 'Prénom', type: 'text', id: 'firstName', name: 'firstName' },
	{ label: 'Adresse mail', type: 'email', id: 'username', name: 'username' },
	{ label: 'Mot de passe', type: 'password', id: 'password', name: 'password' },
	{ label: 'Administrateur', type: 'select', id: 'isAdmin', name: 'isAdmin', options: [{ value: '0', label: 'Non' }, { value: '1', label: 'Oui' }] },
	{ label: 'Date de naissance', type: 'date', id: 'birthday', name: 'birthday' },
	{ label: 'Téléphone', type: 'tel', id: 'phoneNumber', name: 'phoneNumber' },
	{ label: 'Genre', type: 'select', id: 'gender', name: 'gender', options: [{ value: '0', label: 'Femme' }, { value: '1', label: 'Homme' }] },
	{ label: 'Employeur', type: 'select', id: 'employer', name: 'employer', options: [{ value: '0', label: 'Non' }, { value: '1', label: 'Oui' }] },
	{ label: 'Adresse', type: 'text', id: 'adress', name: 'adress' },
	{ label: 'Code postal', type: 'text', id: 'zipCode', name: 'zipCode' },
	{ label: 'Pays', type: 'text', id: 'country', name: 'country' },
	{ label: 'Ville', type: 'text', id: 'city', name: 'city' }
];

const companyFields = [
	{ label: 'Nom de l\'entreprise', type: 'text', id: 'companyName', name: 'companyName' },
	{ label: 'Statut légal', type: 'text', id: 'legalStatus', name: 'legalStatus' },
	{ label: 'Secteur d\'activité', type: 'text', id: 'activitySector', name: 'activitySector' }
];

const offerFields = [
	{ label: 'Titre de l\'annonce', type: 'text', id: 'offerTitle', name: 'offerTitle' },
	{ label: 'Description', type: 'text', id: 'description', name: 'description' },
	{ label: 'Lieu', type: 'text', id: 'location', name: 'location' },
	{ label: 'Salaire', type: 'number', id: 'salary', name: 'salary' },
	{ label: 'Date de publication', type: 'date', id: 'publishDate', name: 'publishDate' }
];

export const MODAL_FIELDS = {
	"Utilisateurs" : userFields,
	"Entreprises" : companyFields,
	"Annonces" : offerFields
}