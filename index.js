const TatsuClient = require('./lib/Tatsu.js');
const UserProfile = require('./lib/structures/user.js');


/**
* Create a new API client
* @arg {string} apiKey Your Tatsu API key, request one by using `t!apikey` on Discord.
* @arg {Object} [options] Optional overrides for certain library settings.
* @arg {Object} [options] Optional overrides for certain library settings.
* @returns TatsuClient
*/
function Tatsu(apiKey, options) {
	return new TatsuClient(apiKey, options);
}


Tatsu.UserProfile = UserProfile;
module.exports = Tatsu;