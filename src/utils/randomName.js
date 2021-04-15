const names = [
	'James',
	'Harry',
	'Sirius',
	'Lavender',
	'Hermione',
	'Igor',
	'Ron',
	'Aberforth',
	'Albus',
	'Dudley',
	'Bellatrix',
	'Neville',
	'Xenophilius',
	'Draco',
]

let randomNameIndex = Math.floor(Math.random() * names.length);
let randomNumber = Math.floor(Math.random() * 256) + 1;
let randomName = names[randomNameIndex] + randomNumber;

export default randomName;
