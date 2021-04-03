const TatsuClient = require('./lib/Tatsu.js');

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

module.exports = Tatsu;