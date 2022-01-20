import { Tatsu } from '../index';

const client = new Tatsu('API_KEY');

client.getStoreListing('floor_dance_orange').then(listing => {
	console.log(listing);
});