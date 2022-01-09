import { Tatsu } from '../index';

const client = new Tatsu('API_KEY');

client.getProfile('131904411789164544').then(profile => {
	console.log(profile);
}, console.error);

