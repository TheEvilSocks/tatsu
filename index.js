const TatsuClient = require('./lib/Tatsu.js');

function Tatsu(apiKey, options) {
	return new TatsuClient(apiKey, options);
}

module.exports = Tatsu;