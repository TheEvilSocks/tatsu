const https = require('https');
const Package = require('../package.json');
const Bucket = require('./Bucket');
const Endpoints = require('./Endpoints');

class TatsuClient {

	/**
	* Create a new API client
	* @arg {string} apiKey Your Tatsumaki API key.
	* @arg {Object} [options] Optional overrides for certain library settings.
	*/
	constructor(apiKey, options) {
		this.apiKey = apiKey;

		this.options = Object.assign({
			bucket: {
				limit: 60,
				interval: 60000,
				networkLatency: 0
			},
			api: {
				headers: {
					'User-Agent': `tatsu/tatsu v${Package.version} - https://github.com/TheEvilSocks/tatsu`,
					'Authorization': this.apiKey
				}
			}
		}, options);

		this.bucket = new Bucket(this.options.bucket.limit, this.options.bucket.interval, this.options.bucket.networkLatency);
	}


	getMemberRanking(guild_id, user_id) {
		return this._doReq(() => {
			return this._makeRequest('GET', Endpoints.GUILD_MEMBER_RANKING(guild_id, user_id))
		});
	}

	getGuildRankings(guild_id, offset) {
		return this._doReq(() => {
			return this._makeRequest('GET', Endpoints.GUILD_RANKINGS(guild_id, offset))
		});
	}

	getProfile(user_id) {
		return this._doReq(() => {
			return this._makeRequest('GET', Endpoints.PROFILE(user_id))
		});
	}



	_doReq(promise) {
		return new Promise((fulfill, reject) => {
			this.bucket.queue(() => {
				promise().then(fulfill, reject);
			});
		});
	}


	_makeRequest(method, path, body) {
		return new Promise((fulfill, reject) => {

			let data = '';
			const req = https.request(path, Object.assign({ method: method }, this.options.api), (res) => {
				res.on('data', function (chunk) {
					data += chunk;
				});

				res.on('end', function () {
					if (res.statusCode == 200) {
						fulfill(JSON.parse(data));
					} else {
						reject(Object.assign({ statusCode: res.statusCode }, JSON.parse(data)));
					}
				});

				res.on('error', (e) => {
					reject(e);
				});
			});

			if (typeof body == "object") {
				req.end(JSON.stringify(body));
			} else {
				req.end();
			}
		});
	}
}

module.exports = TatsuClient;